---
layout: index
---

# Hi, I'm Isabella
Short intro about what you do.

<h2 id="projects">Projects</h2>
{::nomarkdown}
<div class="card-grid">
  {% for project in site.projects %}
    <a class="card" href="{{ project.url | relative_url }}">
      {% if project.image %}
      <img src="{{ project.image | relative_url }}" alt="">
      {% endif %}

      <h3>{{ project.title }}</h3>
      <p>{{ project.summary }}</p>

      {% if project.stack %}
        <ul class="tags">
          {% for tech in project.stack %}
            <li>{{ tech }}</li>
          {% endfor %}
        </ul>
      {% endif %}
    </a>
  {% endfor %}
</div>
{:/nomarkdown}