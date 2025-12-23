import Card from "../components/common/Card/Card";
import CardContent from "../components/common/Card/CardContent";
import CardFooter from "../components/common/Card/CardFooter";
import CardHeader from "../components/common/Card/CardHeader";

export function ExampleFullCard() {
  return (
    <Card
      id="profile-card"
      className="max-w-sm mx-auto"
      tabIndex={0}
      size="lg"
      variant="elevation"
      onClick={(e) => console.log('card clicked', e)}
      onFocus={() => console.log('card focused')}
      onBlur={() => console.log('card blurred')}
      tooltip="User profile"
      aria-label="User profile card"
      aria-describedby="profile-desc"
      aria-current={false}
    >
      <CardHeader
        title={<span>Jane Doe</span>}
        subheader="Product Designer"
        avatar={<img src="/avatar.png" alt="Jane avatar" className="w-8 h-8 rounded-full" />}
        action={<button aria-label="more">•••</button>}
      />

      <CardContent>
        <p id="profile-desc">Jane is a product designer working on the core experience.</p>
      </CardContent>

     
      <CardFooter>
        <small className="text-[var(--color-text-secondary)]">Joined Jan 2024</small>
      </CardFooter>
    </Card>
  );
}