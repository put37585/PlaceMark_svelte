<script>
  import {getContext, onMount} from "svelte";
  import { push } from "svelte-spa-router";
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import PoiVisual from "../components/PoiVisual.svelte";
  import EditPoi from "../components/EditPoi.svelte"

  export let params = {};
  export let message = "";
  const poiId = params.poiid;
  const placeMarkService = getContext("PlaceMarkService");
  let mainPoi = null;
  let editMode = false;
  async function edit() {
    push(`/pois/${mainPoi._id}/edit`)
  }

  onMount(async () => {
    mainPoi = await placeMarkService.getPoi(poiId);
    if (!mainPoi) {
      message = "No point of interest with this id";
    }
  });
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar subTitle={"Your point of interest"} title={"PlaceMark Service"} />
  </div>
  <div class="column">
    <MainNavigator />
  </div>
</div>

<div class="box">
  {#if mainPoi}
      <PoiVisual bind:mainPoi={mainPoi} bind:message editHandler={edit} />
  {/if}
  <div class="section">
    {message}
  </div>
</div>
