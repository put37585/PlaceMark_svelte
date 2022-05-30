<script>
    let newCategoryTitle = ""

    export let message = "";

    export let addCategoryHandler = null;

    async function addCat(){
      addCategoryHandler(newCategoryTitle)
      newCategoryTitle = ""
    }

</script>

<form on:submit|preventDefault={addCat}>
  <div class="field">
    <label class="label" for="title">Category Title</label>
    <input bind:value={newCategoryTitle} class="input" type="text" placeholder="Enter category title" name="title" />
  </div>
  <button class="button is-link">Add Category</button>
  
  <div class="section">
    {message}
  </div>
</form>
