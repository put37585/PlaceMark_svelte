<script>
  export let deletePoiHandler = null;
  export let inspectPoiHandler = null;
  export let poiList = [];
</script>

{#each poiList as poi}
  <div class="box box-link-hover-shadow">
    <h2 class="title">
      {poi.name}
    </h2>
    <button on:click={inspectPoiHandler(poi._id)} class="button">
      <span class="icon is-small">
        <i class="fas fa-info-circle" />
      </span>
    </button>
    <button on:click={deletePoiHandler(poi._id)} class="button">
      <i class="fas fa-trash" />
    </button>
  </div>
{/each}
