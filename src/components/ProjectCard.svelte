<script>
  export let project = {};
  $: ({ title, imgSrc, alt, externalLink, description, techstack } = project);
</script>

<div class="border p-5 border-gray-500">
  <div class="flex gap-5 justify-around flex-wrap">
    <img class="h-60 w-60 object-cover bg-white" src={imgSrc} alt={"Go to Link"}/>
    <div>
      <!-- header -->
      <div class="border-b py-1">
        <a
          href={externalLink}
          target="_blank"
          rel="noreferrer"
          class="space-x-2"
        >
          <img src="./img/icon_link.svg" class="hyperlink-icon" alt={alt}/>
          <h1 class="inline hover:text-blue-500 text-lg font-bold">{title}</h1>
        </a>
      </div>
      <br />

      <p>
        {description}
      </p>
      <br />
      <p class="border-l-2 px-2 border-gray-400 code">
        {techstack}
      </p>
    </div>
  </div>
</div>
