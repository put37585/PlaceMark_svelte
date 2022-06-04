<script>
    import ImageSelect from "../components/ImageSelect.svelte";
    export let mainPoi = null;
    export let message = "";
    export let editHandler = null;
</script>
<button on:click={editHandler} class="button is-pulled-right">
  <span class="icon is-small">
    <i class="fas fa-edit" />
  </span>
</button>
<p class="title" name="name">{mainPoi.name}</p>
{#if mainPoi.img}
  <div class="card-image">
    <figure class="image is-256x256">
      <img src={mainPoi.img} alt="The point of interest" />
    </figure>
  </div>
{/if}
{#if mainPoi.description}
  <div class="container is-fluid mb-4 block">
    <label class="label" for="description">Description</label>
    <p name="description">{mainPoi.description}</p>
  </div>
{/if}
<div class="container is-fluid mb-4 block">
  <label class="label" for="coordinate-group"> Latitude and Longitude </label>
  <div class="field is-grouped" name="coordinate-group">
    <p name="latitude">{mainPoi.latitude}</p>
    <p class="has-text-weight-bold mx-4">/</p>
    <p name="longitude">{mainPoi.longitude}</p>
  </div>
</div>
{#if !mainPoi.img}
  <ImageSelect bind:poi={mainPoi} bind:message />
{/if}
