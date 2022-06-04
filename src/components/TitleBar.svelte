<script>
  import map_img from "/src/assets/map_img.png"
  import {user} from "../stores.js"
  export let title = "";
  export let subTitle = "";
</script>

<div class="box has-text-centered columns m-2">
  <div class="column">
    <img src="{map_img}" width="60" alt="img"/>
  </div>
  <div class="column">
    <div class="title is-5"> {title} </div>
    <div class="subtitle is-5"> {subTitle} </div>
  </div>
  <div class="column">
    <i class="fas fa-map-marked-alt fa-3x" style="font-size: 45px; color: Lightgreen;"  pos="bottom" uk-tooltip></i>
    {#if $user.email}
      <div class="is-size-7">{$user.email} </div>
    {:else}
      <div class="is-size-7">PlaceMark on Svelte</div>
    {/if}
  </div>
</div>
