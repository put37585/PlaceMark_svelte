<script>
  import {getContext} from "svelte";

  export let poi;
  export let message = "";
  export let textButton = "Upload";
  export let tempImage = null;
  export let updateImg = false;
  const placeMarkService = getContext("PlaceMarkService");
  let fileinput;
  let filename = "";
  let image;
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
    const updatedPoi = await placeMarkService.uploadImageToPoi(poi._id, image);
    if (updatedPoi) {
      poi = updatedPoi;
      filename = "";
      message = "";
    } else {
      message = "Error while uploading image";
    }
  }
  async function updateImage() {
    const updatedPoi = await placeMarkService.updateImageToPoi(poi._id, image);
    if (updatedPoi) {
      poi = updatedPoi;
      filename = "";
      message = "";
    } else {
      message = "Error while uploading image";
    }
  }
  async function imageUploadHandler() {
    if (updateImg) {
      updateImage();
    } else {
      uploadImage();
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
    <button on:click={imageUploadHandler} class="button is-info">{textButton}</button>
  </div>
</div>
