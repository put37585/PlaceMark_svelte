<script>
  import {getContext, onMount} from "svelte";
  import {push} from "svelte-spa-router";
  import TitleBar from "../components/TitleBar.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  
  export let params = {};
  
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar subTitle={"Please make a Donation"} title={"Donation Services Inc."} />
  </div>
  <div class="column">
    <MainNavigator />
  </div>
</div>

<div class="box">
    <a href="/categories/{ poi.categoryid }/poi/{poi._id}/edit" class="button is-pulled-right">
      <span class="icon is-small">
        <i class="fas fa-edit"></i>
      </span>
    </a>
    <p class="title" name="name"> { poi.name } </p>
    
    {> poi-image }
    
    {if poi.description}
    <div class="container is-fluid mb-4 block">
      <label class="label">Description</label>
      <p name="description"> { poi.description } </p>
    </div>
    {if}
    <div class="container is-fluid mb-4 block">
      <label class="label"> Latitude and Longitude </label>
      <div class="field is-grouped">
        <p name="latitude"> { poi.latitude } </p>
        <p class="has-text-weight-bold mx-4"> / </p>
        <p name="longitude"> { poi.longitude } </p>
      </div>
    </div>
    {#unless poi.img}
    {> poi-image-select }
    {/unless}
  
  </div>