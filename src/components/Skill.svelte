<script>
  import { SkillData } from "./SkillData";
</script>

<h1 class="text-2xl border-b-2 pb-4 font-bold">SKILLS</h1>
<div class="flex gap-8 flex-col">
  <div class="flex gap-12">
    <h2 class="text-xl font-bold">Frontend</h2>
    <div class="flex gap-8 flex-wrap">
      {#each SkillData.frontend as skill}
        <div class="flex flex-col gap-6 items-center">
          <i class={skill.icon} style="font-size: 56px;"></i>
          <h3 class="text-md">{skill.name}</h3>
        </div>
      {/each}
    </div>
  </div>
  <div class="flex gap-12">
    <h2 class="text-xl font-bold">Backend</h2>
    <div class="flex gap-8 flex-wrap">
      {#each SkillData.backend as skill}
        <div class="flex flex-col gap-6 items-center">
          {#if skill.icon}
            <i class={skill.icon} style="font-size: 56px;"></i>
          {:else}
            <img src={skill.img} alt={skill.name} class="w-14 h-14" />
          {/if}
          <h3 class="text-md">{skill.name}</h3>
        </div>
      {/each}
    </div>
  </div>
  <div class="flex gap-12">
    <h2 class="text-xl font-bold">Other Skills</h2>
    <div class="flex gap-8 flex-wrap">
      <ul>
        <li><span class="font-bold">Version Control:</span> Git</li>
        <li><span class="font-bold">Computation Intelligence</span></li>
        <li><span class="font-bold">Languages:</span> Thai (Native), English  (IELTS 7.5)</li>
      </ul>
    </div>
  </div>
</div>
