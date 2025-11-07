---
layout: page
title: Tanadol's Blog
permalink: /blog/
---

<ul class="space-y-8 my-8">
  {% for post in site.posts %}
    <li class="list-none">
      {%- include post-card.html item=post -%}
    </li>
  {% endfor %}
</ul>