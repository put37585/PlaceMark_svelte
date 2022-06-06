<script>
  import {getContext, onMount} from "svelte";
  import {push} from "svelte-spa-router";
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import ListPois from "../components/ListPois.svelte";
  import AddPoi from "../components/AddPoi.svelte";
  import PlaceMarkMap from "../components/PlaceMarkMap.svelte";

  export let params = {};
  const categoryId = params.categoryid;
  const placeMarkService = getContext("PlaceMarkService");
  const savedUser = {};
  let placeMarkMap = null;
  let categoryName = "";
  let message = "";
  let poiList = [];
  let newPoiName = "";
  let newPoiDescription = "";
  let newPoiLatitude = "";
  let newPoiLongitude = "";

  async function addPoi() {
    const newPoi = {
      name: newPoiName,
      description: newPoiDescription,
      latitude: newPoiLatitude,
      longitude: newPoiLongitude,
    };
    const createdPoi = await placeMarkService.createPoi(categoryId, newPoi);
    if (createdPoi) {
      poiList.push(createdPoi);
      poiList = [...poiList];

      newPoiName = "";
      newPoiDescription = "";
      newPoiLatitude = "";
      newPoiLongitude = "";
      message = "";
      placeMarkMap.addPoi(createdPoi);
    } else {
      message = "Make sure PoI-name and Latitude/Logitude are not emty.";
    }
  }
  async function deletePoi(poiId) {
    const deletedPoi = await placeMarkService.deletePoi(poiId);
    if (deletedPoi) {
      const found = poiList.findIndex((poi) => poi._id == poiId);
      if (found !== -1) {
        const deletedPoi = poiList[found];
        poiList.splice(found, 1);
        poiList = [...poiList];
        placeMarkMap.removePoi(deletedPoi);
      }
    } else {
      message = "There was a error deleting the PoI";
    }
  }

  async function inspectPoi(poiId) {
    push("/pois/" + poiId);
  }

  onMount(async () => {
    const placeMarkCredentials = localStorage.placeMark;
    if (placeMarkCredentials) {
      const tempUser = JSON.parse(placeMarkCredentials);
      savedUser.id = tempUser.id;
      savedUser.token = tempUser.token;
      savedUser.email = tempUser.email;
    } else {
      push("/login");
    }
    const category = await placeMarkService.getCategory(categoryId);
    if (category) {
      categoryName = category.title;
      poiList = category.pois;
      placeMarkMap.showPoiList(poiList);
    }
  });
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar subTitle={"Add and view points of interest"} title={"PlaceMark Service"} />
  </div>
  <div class="column">
    <MainNavigator />
  </div>
</div>

<h2 class="title">Category: {categoryName}</h2>

<div class="columns is-vcentered">
  <div class="column has-text-centered">
    <PlaceMarkMap bind:this={placeMarkMap} />
  </div>
  <div class="column has-text-centered">
    <ListPois {poiList} deletePoiHandler={deletePoi} inspectPoiHandler={inspectPoi} />
    <AddPoi addPoiHandler={addPoi} {message} bind:newPoiName bind:newPoiDescription bind:newPoiLatitude bind:newPoiLongitude />
  </div>
</div>
