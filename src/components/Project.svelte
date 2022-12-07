<script lang="ts">
  import ProjectCard from "./ProjectCard.svelte";
  import projects from "../assets/Projects.json";
</script>

<h1 class="text-2xl border-b-2 pb-4 font-bold">PROJECTS</h1>
<div class="project-grid">
  {#each projects as project}
    <ProjectCard {project} />
  {/each}
</div>
