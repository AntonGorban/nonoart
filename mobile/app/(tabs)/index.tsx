import { UI } from '@nono-art/ui-mobile';

import { ParallaxScrollView } from '@/components';

export default function HomeScreen() {
  return (
    <ParallaxScrollView>
      <UI.Hello>qwe</UI.Hello>

      <UI.Hello />
    </ParallaxScrollView>
  );
}
