<script>
  import map_img from "/src/assets/map_img.png";
  import WelcomeNavigator from "../components/WelcomeNavigator.svelte";
  import TitleBar from "../components/TitleBar.svelte";
  import {getContext} from "svelte";

  const placeMarkService = getContext("PlaceMarkService");
  placeMarkService.logout();
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar subTitle={"Sign up or Log in"} title={"PlaceMark Service"}/>
  </div>
  <div class="column">
    <WelcomeNavigator/>
  </div>
</div>

<div class="columns is-vcentered content">
  <div class="column has-text-centered">
    <img alt="map_img" src="{map_img}" width="300">
  </div>
  <div class="column">
    <h1 class="title">Welcome to PlaceMark</h1>
    <p>Categorize your points of interest!</p>
    <p>Add images and more ...</p>
  </div>
</div>

