<script>
  import map_img2 from "/src/assets/map_img2.png";
  import WelcomeNavigator from "../components/WelcomeNavigator.svelte";
  import TitleBar from "../components/TitleBar.svelte";
  import SignupForm from "../components/SignupForm.svelte";
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar subTitle={"Sign up or Log in"} title={"PlaceMark Service"}/>
  </div>
  <div class="column">
    <WelcomeNavigator/>
  </div>
</div>

<div class="columns">
  <div class="column">
    <div class="box">
      <h1 class="title">Login</h1>
      <SignupForm/>
    </div>
  </div>
  <div class="column has-text-centered">
    <img alt="map_img" src="{map_img2}" width="400">
  </div>
</div>

