<script>
  import {getContext} from "svelte";
  import {push} from "svelte-spa-router";
  export let poiId;
  export let images = [];
  export let message = "";
  export let textButton = "Upload";
  const placeMarkService = getContext("PlaceMarkService");
  let fileinput;
  let filename = "";
  let image;
  let tempImage = null;
  const onFileSelected = (e) => {
    image = e.target.files[0];
    filename = image.name;
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      tempImage = e.target.result;
    };
  };

  async function uploadImage() {
    const updatedPoi = await placeMarkService.uploadImageToPoi(poiId, image);
    if (updatedPoi) {
      images = updatedPoi.img;
      images = [...images];
      tempImage = null;
      filename = "";
      message = "";
    } else {
      message = "Error while uploading image";
    }
  }
</script>

<div class="card box has-text-centered">
  {#if tempImage}
    <img src={tempImage} alt="d" />
  {/if}
  <div id="file-select" class="file has-name is-fullwidth">
    <label class="file-label">
      <input class="file-input" type="file" accept=".jpg, .jpeg, .png" on:change={(e) => onFileSelected(e)} bind:this={fileinput} />
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload" />
        </span>
        <span class="file-label"> Choose a image… </span>
      </span>
      <span class="file-name">{filename}</span>
    </label>
    <button on:click={uploadImage} class="button is-info">{textButton}</button>
  </div>
</div>
