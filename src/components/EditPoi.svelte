<script>
  import {getContext, onMount} from "svelte";
  import {push} from "svelte-spa-router";
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import ImageSelect from "../components/ImageSelect.svelte";
  import ImageCarousel from "./ImageCarousel.svelte";
  export let params = {};
  export let mainPoi = null;
  export let message = "";
  const placeMarkService = getContext("PlaceMarkService");
  const poiId = params.poiid;

  async function updatePoi() {
    const tempPoi = {
      name: mainPoi.name,
      description: mainPoi.description,
      latitude: mainPoi.latitude,
      longitude: mainPoi.longitude,
    };
    const updatedPoi = await placeMarkService.updatePoi(mainPoi._id, tempPoi);
    if (updatedPoi) {
      push(`/pois/${updatedPoi._id}`);
    } else {
      message = "Something went wrong while updating the poi";
    }
  }

  async function cancelEdit() {
    push(`/pois/${mainPoi._id}`);
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
    <TitleBar subTitle={"Edit point of interest"} title={"PlaceMark Service"} />
  </div>
  <div class="column">
    <MainNavigator />
  </div>
</div>
<div class="box">
  {#if mainPoi}
    <button on:click={cancelEdit} class="button is-pulled-right">
      <span class="icon is-small has-text-danger">
        <i class="fas fa-ban" />
      </span>
    </button>

    <form on:submit|preventDefault={updatePoi}>
      <div class="field">
        <label class="label" for="name">PoI Name</label>
        <input bind:value={mainPoi.name} class="input" type="text" placeholder="Enter the name of the location" name="name" />
        <label class="label" for="description">Description</label>
        <input bind:value={mainPoi.description} class="input" type="text" placeholder="Describe the place" name="description" />
        <label class="label" for="location_group">Latitude and Longitude</label>
        <div class="field is-grouped" name="location_group">
          <input bind:value={mainPoi.latitude} class="input" type="number" placeholder="Latitude" name="latitude" />
          <p class="is-size-4 has-text-weight-bold">/</p>

          <input bind:value={mainPoi.longitude} class="input" type="number" placeholder="Longitude" name="longitude" />
        </div>
      </div>
      <button class="button is-link">Update Point of interest</button>
    </form>

    {#if mainPoi.img}
      <ImageCarousel bind:images={mainPoi.img} enableDelete={true} poiId={mainPoi._id} />
    {/if}
    <ImageSelect bind:images={mainPoi.img} poiId={mainPoi._id} bind:message textButton={"Add image"} />
  {/if}

  <div class="section">
    {message}
  </div>
</div>
