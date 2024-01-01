<script>
  import Footer from "./components/Footer.svelte";
  import Intro from "./components/Intro.svelte";
  import Skill from "./components/Skill.svelte";
  import Project from "./components/Project.svelte";
</script>

<main>
  <div class="max-w-screen-lg mx-auto px-5 py-10">
    <div id="content" class="space-y-10">
      <Intro />
      <Skill />
      <Project />
      <Footer />
    </div>
  </div>
</main>

<style>
</style>
