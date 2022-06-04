<script>
  export let message = "";
  export let addPoiHandler = null;

  export let newPoiName = "";
  export let newPoiDescription = "";
  export let newPoiLatitude = "";
  export let newPoiLongitude = "";
</script>

<form on:submit|preventDefault={addPoiHandler}>
  <div class="card">
    <div class="card-content">
      <div class="field">
        <label class="label" for="name">PoI Name</label>
        <input bind:value={newPoiName} class="input" type="text" placeholder="Enter the name of the location" name="name" />
        <label class="label" for="description">Description</label>
        <input bind:value={newPoiDescription} class="input" type="text" placeholder="Describe the place" name="description" />
        <label class="label" for="location_group">Latitude and Longitude</label>
        <div class="field is-grouped" name="location_group">
          <input bind:value={newPoiLatitude} class="input" type="number" placeholder="Latitude" name="latitude" />
          <p class="is-size-4 has-text-weight-bold">/</p>
          <input bind:value={newPoiLongitude} class="input" type="number" placeholder="Longitude" name="longitude" />
        </div>
      </div>
      <button class="button is-link">Add Point of Intrest</button>
    </div>
  </div>
  <div class="section">
    {message}
  </div>
</form>
