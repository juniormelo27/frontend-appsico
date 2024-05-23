import Ethics from './containers/ethics';
import RedirectSearch from './containers/redirect-search';
import Reviews from './containers/reviews';
import TypeServices from './containers/type-services';

export default function HomeScreen() {
  return (
    <main>
      {/* <Hero /> */}
      <TypeServices />
      <Reviews />
      <Ethics />
      <RedirectSearch />
    </main>
  );
}
