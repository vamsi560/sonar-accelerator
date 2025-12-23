/**
 * Progress Component Stories
 *
 * Storybook stories demonstrating the Progress component variants including:
 * - LinearProgress: Horizontal progress bars with multiple variants
 * - CircularProgress: Circular progress indicators with sizing options
 * - Various states: determinate, indeterminate, buffer, query
 * - Color variants: primary, secondary, error, info, success, warning
 * - Size options: small, medium, large
 */

import { useState } from 'react';
import LinearProgress from './LinearProgress';
import CircularProgress from './CircularProgress';
import Typography from '../Typography/Typography';

export default {
  title: 'Common/Progress',
};

/**
 * LinearProgress - Determinate variant
 * Shows a linear progress bar with a specific value (0-100).
 * Includes an interactive slider to adjust the progress value.
 */
export const LinearDeterminate = () => {
  const [value, setValue] = useState(40);
  return (
    <div className="w-full max-w-md space-y-4 p-4">
      <Typography variant="h6">Linear Progress - Determinate</Typography>
      <LinearProgress
        id="linear-determinate"
        value={value}
        variant="determinate"
        aria-label="Linear progress indicator"
        aria-valuetext={`Progress: ${value}%`}
      />
      <Typography variant="body2" color="inherit">
        Value: {value}%
      </Typography>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

/**
 * LinearProgress - Indeterminate variant
 * Shows a linear progress bar with animated loading state.
 * No specific value is indicated; used for indefinite loading scenarios.
 */
export const LinearIndeterminate = () => (
  <div className="w-full max-w-md space-y-4 p-4">
    <Typography variant="h6">Linear Progress - Indeterminate</Typography>
    <LinearProgress
      id="linear-indeterminate"
      variant="indeterminate"
      aria-label="Linear progress loading indicator"
      aria-valuetext="Loading..."
    />
  </div>
);

/**
 * LinearProgress - Color variants
 * Displays linear progress bars in different color themes using design tokens.
 * Shows all available color options: primary, secondary, error, info, success, warning.
 */
export const LinearColors = () => {
  const colors: Array<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = [
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
  ];
  return (
    <div className="w-full max-w-md space-y-4 p-4">
      <Typography variant="h6">Linear Progress - Colors</Typography>
      {colors.map((color) => (
        <div key={color} className="space-y-1">
          <Typography variant="body2">{color}</Typography>
          <LinearProgress
            id={`linear-${color}`}
            color={color}
            variant="determinate"
            value={60}
            aria-label={`Linear progress in ${color} color`}
          />
        </div>
      ))}
    </div>
  );
};

/**
 * LinearProgress - Size variants
 * Displays linear progress bars in different heights: small, medium, large.
 */
export const LinearSizes = () => (
  <div className="w-full max-w-md space-y-6 p-4">
    <Typography variant="h6">Linear Progress - Sizes</Typography>
    <div className="space-y-2">
      <Typography variant="body2">Small</Typography>
      <LinearProgress
        id="linear-small"
        size="small"
        variant="determinate"
        value={70}
        aria-label="Small linear progress"
      />
    </div>
    <div className="space-y-2">
      <Typography variant="body2">Medium</Typography>
      <LinearProgress
        id="linear-medium"
        size="medium"
        variant="determinate"
        value={70}
        aria-label="Medium linear progress"
      />
    </div>
    <div className="space-y-2">
      <Typography variant="body2">Large</Typography>
      <LinearProgress
        id="linear-large"
        size="large"
        variant="determinate"
        value={70}
        aria-label="Large linear progress"
      />
    </div>
  </div>
);

/**
 * CircularProgress - Determinate variant
 * Shows a circular progress indicator with a specific value (0-100).
 * Includes an interactive slider to adjust the progress value.
 */
export const CircularDeterminate = () => {
  const [value, setValue] = useState(60);
  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <Typography variant="h6">Circular Progress - Determinate</Typography>
      <CircularProgress
        id="circular-determinate"
        value={value}
        variant="determinate"
        aria-label="Circular progress indicator"
        aria-valuetext={`Progress: ${value}%`}
      />
      <Typography variant="body2" color="inherit">
        Value: {value}%
      </Typography>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-48"
      />
    </div>
  );
};

/**
 * CircularProgress - Indeterminate variant
 * Shows circular progress indicators with animated loading state.
 * Displays multiple circular indicators in different colors.
 */
export const CircularIndeterminate = () => (
  <div className="flex flex-col items-center gap-6 p-4">
    <Typography variant="h6">Circular Progress - Indeterminate</Typography>
    <div className="flex items-center gap-8">
      <CircularProgress
        id="circular-indeterminate-1"
        variant="indeterminate"
        aria-label="Circular progress loading indicator primary"
        aria-valuetext="Loading..."
      />
      <CircularProgress
        id="circular-indeterminate-2"
        variant="indeterminate"
        color="secondary"
        aria-label="Circular progress loading indicator secondary"
        aria-valuetext="Loading..."
      />
      <CircularProgress
        id="circular-indeterminate-3"
        variant="indeterminate"
        color="success"
        aria-label="Circular progress loading indicator success"
        aria-valuetext="Loading..."
      />
    </div>
  </div>
);

/**
 * CircularProgress - Color variants
 * Displays circular progress indicators in different color themes using design tokens.
 * Shows all available color options in determinate state.
 */
export const CircularColors = () => {
  const colors: Array<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = [
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
  ];
  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <Typography variant="h6">Circular Progress - Colors</Typography>
      <div className="flex flex-wrap gap-8 justify-center">
        {colors.map((color) => (
          <div key={color} className="flex flex-col items-center gap-2">
            <Typography variant="caption">{color}</Typography>
            <CircularProgress
              id={`circular-${color}`}
              color={color}
              variant="determinate"
              value={75}
              aria-label={`Circular progress in ${color} color`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * CircularProgress - Size variants
 * Displays circular progress indicators in different sizes: small, medium, large.
 * Uses the size prop to control dimensions: small (24px), medium (40px), large (56px).
 */
export const CircularSizes = () => (
  <div className="flex flex-col items-center gap-6 p-4">
    <Typography variant="h6">Circular Progress - Sizes</Typography>
    <div className="flex items-center gap-12">
      <div className="flex flex-col items-center gap-2">
        <Typography variant="caption">Small (24px)</Typography>
        <CircularProgress
          id="circular-small"
          size="small"
          variant="determinate"
          value={65}
          aria-label="Small circular progress"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Typography variant="caption">Medium (40px)</Typography>
        <CircularProgress
          id="circular-medium"
          size="medium"
          variant="determinate"
          value={65}
          aria-label="Medium circular progress"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Typography variant="caption">Large (56px)</Typography>
        <CircularProgress
          id="circular-large"
          size="large"
          variant="determinate"
          value={65}
          aria-label="Large circular progress"
        />
      </div>
    </div>
  </div>
);


