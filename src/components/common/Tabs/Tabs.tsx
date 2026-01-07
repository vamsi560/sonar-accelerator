/**
 * Tabs System - Option B (Improved existing code)
 * Reusable Tabs component inspired by MUI Tabs with minimal API changes.
 * - Supports numeric and string values for tabs
 * - Full keyboard navigation (Home/End/Arrow keys)
 * - Animated indicator bar
 * - Auto-scroll for scrollable variant
 * - Fade-in TabPanels
 * - Registers/unregisters tabs in DOM order
 * - Uses design tokens in `src/styles/tokens.css`
 *
 * Usage:
 *   <Tabs defaultValue={0} variant="scrollable" size="medium">
 *     <Tab value={0} label="One" />
 *     <Tab value="two" label="Two" />
 *     <TabPanel value={0}> ... </TabPanel>
 *     <TabPanel value="two"> ... </TabPanel>
 *   </Tabs>
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
  useId,
} from "react";

// ============================================================================
// Types
// ============================================================================
export type TabSize = "small" | "medium" | "large";
export type TabVariant =
  | "basic"
  | "scrollable"
  | "centered"
  | "full-width"
  | "vertical"
  | "vertical-centered";

interface RegisteredTab {
  value: string | number;
  el: HTMLButtonElement | null;
  id?: string;
}

interface TabsContextType {
  value: string | number;
  onChange: (value: string | number) => void;
  variant: TabVariant;
  size: TabSize;
  disabled?: boolean;
  orientation: "horizontal" | "vertical";
  registerTab: (value: string | number, el: HTMLButtonElement | null, id?: string) => void;
  unregisterTab: (value: string | number) => void;
  getTabIndex: (value: string | number) => number;
  tabsListRef: React.MutableRefObject<RegisteredTab[]>;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tab components must be used within a Tabs component");
  }
  return context;
};

// ============================================================================
// Props Interfaces
// ============================================================================
export interface TabsProps {
  id?: string;
  className?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  variant?: TabVariant;
  size?: TabSize;
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-orientation"?: "horizontal" | "vertical";
}

export interface TabProps {
  id?: string;
  className?: string;
  value: string | number;
  label?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: string | number;
  tabIndex?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  tooltip?: string;
  children?: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

export interface TabPanelProps {
  id?: string;
  className?: string;
  value: string | number;
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

// ============================================================================
// Size Classes
// ============================================================================
const sizeClasses: Record<TabSize, { tab: string; panel: string }> = {
  small: {
    tab: "text-[var(--font-size-small)] px-2 py-1",
    panel: "text-[var(--font-size-small)]",
  },
  medium: {
    tab: "text-[var(--font-size-medium)] px-4 py-2",
    panel: "text-[var(--font-size-medium)]",
  },
  large: {
    tab: "text-[var(--font-size-large)] px-6 py-3",
    panel: "text-[var(--font-size-large)]",
  },
};

// ============================================================================
// Variant Classes
// ============================================================================
const variantContainerClasses: Record<TabVariant, string> = {
  basic: "flex border-b border-[var(--color-primary-light)]",
  scrollable: "flex overflow-x-auto border-b border-[var(--color-primary-light)] scrollbar-hide",
  centered: "flex justify-center border-b border-[var(--color-primary-light)]",
  "full-width": "flex border-b border-[var(--color-primary-light)]",
  vertical: "flex flex-col border-r border-[var(--color-primary-light)]",
  "vertical-centered": "flex flex-col justify-center border-r border-[var(--color-primary-light)]",
};

const variantTabClasses: Record<TabVariant, string> = {
  basic: "border-b-2 border-transparent",
  scrollable: "border-b-2 border-transparent whitespace-nowrap",
  centered: "border-b-2 border-transparent flex-1",
  "full-width": "flex-1 border-b-2 border-transparent",
  vertical: "border-r-2 border-transparent text-left",
  "vertical-centered": "border-r-2 border-transparent text-left flex-1",
};

// ============================================================================
// Tabs Component
// ============================================================================
const Tabs = ({
  id,
  className = "",
  value: controlledValue,
  defaultValue = 0,
  onChange,
  disabled = false,
  variant = "basic",
  size = "medium",
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "aria-orientation": ariaOrientation,
}: TabsProps) => {
  const generatedId = useId();
  const rootId = id ?? `tabs-${generatedId}`;
  const [internalValue, setInternalValue] = useState<string | number>(defaultValue);
  const value = controlledValue ?? internalValue;
  const isVertical = (ariaOrientation ?? (variant.includes("vertical") ? "vertical" : "horizontal")) === "vertical";
  const orientation = isVertical ? "vertical" : "horizontal";

  // ordered registered tabs (in DOM order)
  const tabsListRef = useRef<RegisteredTab[]>([]);

  // indicator state
  const [indicator, setIndicator] = useState({ left: 0, width: 0, top: 0, height: 0 });

  // container ref to compute offsets
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleChange = useCallback((newValue: string | number) => {
    if (!disabled) {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      if (onChange) onChange(newValue);
    }
  }, [disabled, controlledValue, onChange]);

  // register / unregister tabs (keeps DOM order)
  const registerTab = useCallback((tabValue: string | number, el: HTMLButtonElement | null, tabId?: string) => {
    // If el is null, ensure it's removed.
    tabsListRef.current = tabsListRef.current.filter((r) => r.value !== tabValue);
    if (el) {
      // Insert at end (DOM order is represented by render order of Tab components)
      tabsListRef.current.push({ value: tabValue, el, id: tabId });
    }
    // update indicator after registration
    // do in layout effect via effect triggered by value change below
  }, []);

  const unregisterTab = useCallback((tabValue: string | number) => {
    tabsListRef.current = tabsListRef.current.filter((r) => r.value !== tabValue);
  }, []);

  const getTabIndex = useCallback((tabValue: string | number) => {
    return tabsListRef.current.findIndex((r) => r.value === tabValue);
  }, []);

  // compute indicator when value or tabs list changes or on resize
  useLayoutEffect(() => {
    const entries = tabsListRef.current;
    const entry = entries.find((e) => e.value === value);
    if (entry?.el && containerRef.current) {
      const elRect = entry?.el.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      if (orientation === "horizontal") {
        setIndicator({
          left: elRect.left - containerRect.left + containerRef.current.scrollLeft,
          width: elRect.width,
          top: 0,
          height: 2,
        });
      } else {
        // vertical indicator (height & top)
        setIndicator({
          left: 0,
          width: 2,
          top: elRect.top - containerRect.top + containerRef.current.scrollTop,
          height: elRect.height,
        });
      }

      // if scrollable variant, ensure selected tab is visible
      if (variant === "scrollable") {
        entry.el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    } else {
      // no entry found - collapse indicator
      setIndicator({ left: 0, width: 0, top: 0, height: 0 });
    }
    // recompute on window resize
    const handleResize = () => {
      const e = tabsListRef.current.find((e) => e.value === value);
      if (e?.el && containerRef.current) {
        const elRect = e?.el.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        if (orientation === "horizontal") {
          setIndicator({
            left: elRect.left - containerRect.left + containerRef.current.scrollLeft,
            width: elRect.width,
            top: 0,
            height: 2,
          });
        } else {
          setIndicator({
            left: 0,
            width: 2,
            top: elRect.top - containerRect.top + containerRef.current.scrollTop,
            height: elRect.height,
          });
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [value, children, variant, orientation]);

  // Provider value - memoized to prevent unnecessary re-renders of consuming components
  const providerValue: TabsContextType = useMemo(
    () => ({
      value,
      onChange: handleChange,
      variant,
      size,
      disabled,
      orientation,
      registerTab,
      unregisterTab,
      getTabIndex,
      tabsListRef,
    }),
    [value, handleChange, variant, size, disabled, orientation, registerTab, unregisterTab, getTabIndex, tabsListRef]
  );

  // outer container class
  const containerClasses = `${variantContainerClasses[variant]} ${className}`;

  return (
    <TabsContext.Provider value={providerValue}>
      <div className={`${isVertical ? "flex" : ""} relative ${containerClasses}`} ref={containerRef} id={rootId} role="tablist" aria-label={ariaLabel} aria-labelledby={ariaLabelledby} aria-describedby={ariaDescribedby} aria-orientation={orientation}>
        {/* tabs are rendered by children */}
        {children}

        {/* Animated indicator */}
        {/* Horizontal: bottom underline, Vertical: left rail */}
        <span
          aria-hidden
          className={`absolute transition-all duration-300 bg-[var(--color-primary)]`}
          style={
            orientation === "horizontal"
              ? {
                  height: `${indicator.height}px`,
                  width: `${indicator.width}px`,
                  transform: `translateX(${indicator.left}px)`,
                  bottom: 0,
                  left: 0,
                }
              : {
                  width: `${indicator.width}px`,
                  height: `${indicator.height}px`,
                  transform: `translateY(${indicator.top}px)`,
                  left: 0,
                  top: 0,
                }
          }
        />
      </div>
    </TabsContext.Provider>
  );
};

// ============================================================================
// Tab Component
// ============================================================================
const Tab = ({
  id,
  className = "",
  value,
  label,
  disabled = false,
  icon,
  badge,
  tabIndex = 0,
  onClick,
  onFocus,
  onBlur,
  tooltip,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
}: TabProps) => {
  const {
    value: selectedValue,
    onChange,
    variant,
    size,
    disabled: tabsDisabled,
    orientation,
    registerTab,
    unregisterTab,
    tabsListRef,
  } = useTabsContext();

  const tabRef = useRef<HTMLButtonElement | null>(null);
  const generatedId = useId();
  const tabId = id ?? `tab-${generatedId}-${String(value)}`;
  const isSelected = selectedValue === value;
  const isDisabled = disabled || tabsDisabled;

  // Register tab when mounted and update on unmount
  useEffect(() => {
    registerTab(value, tabRef.current, tabId);
    return () => unregisterTab(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Keep registration updated if element ref changes
  useEffect(() => {
    // update element pointer
    registerTab(value, tabRef.current, tabId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabRef.current]);

  // When selected, ensure scroll into view for scrollable variant
  useEffect(() => {
    if (isSelected && variant === "scrollable" && tabRef.current) {
      tabRef.current.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [isSelected, variant]);

  // handle click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      onChange(value);
    }
    if (onClick) onClick(e);
  };

  // keyboard nav using tabsListRef (DOM order preserved)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    const entries = tabsListRef.current.filter((r) => r.el); // available elements
    const currentIndex = entries.findIndex((r) => r.value === value);

    const focusIndex = (index: number) => {
      if (entries.length === 0) return;
      const idx = (index + entries.length) % entries.length;
      const el = entries[idx].el;
      if (el) el.focus();
    };

    // Handle key down for both horizontal and vertical navigation
    const handleKeyNavigation = () => {
      if (e.key === "Home") {
        e.preventDefault();
        focusIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        focusIndex(entries.length - 1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onChange(value);
      } else if (orientation === "horizontal") {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          focusIndex(currentIndex - 1);
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          focusIndex(currentIndex + 1);
        }
      } else if (orientation === "vertical") {
        // vertical navigation: up/down
        if (e.key === "ArrowUp") {
          e.preventDefault();
          focusIndex(currentIndex - 1);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          focusIndex(currentIndex + 1);
        }
      }
    };

    handleKeyNavigation();
  };

  const baseClasses = `inline-flex items-center gap-2 font-medium transition-colors duration-200 focus:outline-none focus:ring-0 focus:ring-[var(--color-primary)] focus:ring-offset-2 ${sizeClasses[size].tab} ${variantTabClasses[variant]}`;
  const activeClasses = isSelected ? "text-[var(--color-primary)" : "text-gray-600 hover:text-[var(--color-primary)]";
  const disabledClasses = isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      ref={tabRef}
      id={tabId}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      aria-controls={`${tabId}-panel`}
      aria-label={ariaLabel || (typeof label === "string" ? label : undefined)}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      tabIndex={isSelected ? tabIndex : -1}
      disabled={isDisabled}
      onClick={handleClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      title={tooltip}
      className={`${baseClasses} ${activeClasses} ${disabledClasses} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {label ?? children}
      {badge !== undefined && (
        <span className="ml-1 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full bg-[var(--color-error)] text-white text-xs font-bold">
          {badge}
        </span>
      )}
    </button>
  );
};

// ============================================================================
// TabPanel Component
// ============================================================================
const TabPanel = ({
  id,
  className = "",
  value,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
}: TabPanelProps) => {
  const { value: selectedValue } = useTabsContext();
  const isSelected = selectedValue === value;
  const generatedId = useId();
  const panelId = id ?? `tabpanel-${generatedId}-${String(value)}`;

  return (
    <div
      id={`${panelId}-panel`}
      role="tabpanel"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      hidden={!isSelected}
      className={`transition-opacity duration-300 ${isSelected ? "opacity-100 block" : "opacity-0 hidden"} p-4 ${className}`}
      aria-hidden={!isSelected}
    >
      {isSelected && children}
    </div>
  );
};

// ============================================================================
// Exports
// ============================================================================
export { Tabs, Tab, TabPanel };
export default Tabs;
