<script>
  import {setContext} from "svelte";
  import {PlaceMarkService} from "./services/placemark-service";
  import Router from "svelte-spa-router";

  import Main from "./pages/Main.svelte"
  import Login from "./pages/Login.svelte"
  import Signup from "./pages/Signup.svelte"
  import Dashboard from "./pages/Dashboard.svelte"
  import Category from "./pages/Category.svelte"
  import Poi from "./pages/Poi.svelte"
  import EditPoi from "./components/EditPoi.svelte"
  
  setContext("PlaceMarkService", new PlaceMarkService("http://localhost:4000"));// "https://placemark-ksda.herokuapp.com")); //

  let routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/logout": Main,
    "/categories": Dashboard,
    "/categories/:categoryid": Category,
    "/pois/:poiid": Poi,
    "/pois/:poiid/edit": EditPoi,
  }
  
</script>

<div class="container">
  <Router {routes}/>
</div>
