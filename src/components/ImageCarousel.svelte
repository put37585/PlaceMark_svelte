<script>
  import Carousel from "svelte-carousel";
  import {push} from "svelte-spa-router";
  import {getContext} from "svelte";
  export let images = [];
  export let enableDelete = false;
  export let poiId;
  const placeMarkService = getContext("PlaceMarkService");
  let carousel;
  let currentIndex = 0;
  async function deleteImage() {
    if (!images.length) return;
    const imageUrl = images[currentIndex];
    const success = await placeMarkService.deleteImageFromPoi(poiId, imageUrl);
    if (success) {
      const found = images.findIndex((img) => img === imageUrl);
      if (found !== -1) {
        images.splice(found, 1);
        images = [...images];
      }
    }
  }
  async function onCarouselChange(currentIdx) {
    currentIndex = currentIdx;
  }
</script>

{#if images.length}
  {#if enableDelete}
    <button on:click={deleteImage} class="button is-pulled-right has-text-danger">
      <span class="icon is-small">
        <i class="fas fa-trash" />
      </span>
    </button>
  {/if}
  {#key images}
  <Carousel bind:this={carousel} on:pageChange={(event) => onCarouselChange(event.detail)}>
    {#each images as img}
      <div class="card-image">
        <figure class="image is-256x256">
          <img src={img} alt="The point of interest" />
        </figure>
      </div>
    {/each}
  </Carousel>
  {/key}
{/if}
