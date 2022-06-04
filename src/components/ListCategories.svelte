<script>
  export let deleteCategoryHandler = null;
  export let categoryList = [];
</script>

{#each categoryList as category}
  <div class="box box-link-hover-shadow">
    <h2 class="title">
      {category.title}
    </h2>
    <a href="/#/categories/{category._id}" class="button">
      <span class="icon is-small">
        <i class="fas fa-folder-open" />
      </span>
    </a>
    <button on:click={deleteCategoryHandler(category._id)} class="button">
      <i class="fas fa-trash" />
    </button>
  </div>
{/each}
