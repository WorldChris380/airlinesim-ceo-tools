let navbar = document.querySelector("#as-navbar-main-collapse > ul");
navbar.innerHTML += `<li class="dropdown">
  <a
    role="button"
    tabindex="0"
    data-toggle="dropdown"
    class="dropdown-toggle"
    style="cursor: pointer"
    ><img width="14px" src="${chrome.runtime.getURL('icons/Christian-Boehme-Logo-128px.png')}" alt="AS CEO Tools"> AS CEO Tools
    <span class="caret"> </span>
  </a>
  <ul class="dropdown-menu">
    <li class="dropdown-header">Community</li>
    <li>
      <a
        href="https://forums.airlinesim.aero/t/introducing-airlinesim-enhancement-suite-beta/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span aria-hidden="true" class="fa fa-external-link"></span>
        Forum Topic
      </a>
    </li>
    <li>
      <a
        href="https://discord.com/channels/113555701774749696/1249639537450160138"
        target="_blank"
        rel="noreferrer noopener"
        ><span aria-hidden="true" class="fa fa-external-link"></span>Discord</a
      >
    </li>
    <li class="divider"></li>
    <li class="dropdown-header">Support</li>
    <li>
      <a
        href="https://christian-boehme.com/airlinesim_extention.html"
        target="_blank"
        rel="noreferrer noopener"
        ><span aria-hidden="true" class="fa fa-book"></span>Website of the extention</a
      >
    </li>
    <li>
      <a
        href="https://github.com/WorldChris380/airlinesim-ceo-tools"
        target="_blank"
        rel="noreferrer noopener"
        ><span aria-hidden="true" class="fa fa-github"></span>GitHub</a
      >
    </li>
    <li>
      <a
        href="https://github.com/WorldChris380/airlinesim-ceo-tools/issues/new"
        target="_blank"
        rel="noreferrer noopener"
        ><span aria-hidden="true" class="fa fa-bug"></span>Report a Bug</a
      >
    </li>
    <li class="divider"></li>
    <li class="dropdown-header">About the developer</li>
    <li>
      <a class="linkedIn"
        href="https://www.linkedin.com/in/christian-boehme-business/"
        target="_blank"
        rel="noreferrer noopener"
        ><span><svg width="11px" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 448 512">
         <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#C3C7C7" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></span> Hire me!</a
      >
    </li>
  </ul>
</li>
`;
let linkedIn = document.getElementsByClassName("linkedIn")[0];
linkedIn.style.padding = "3px 20px";
linkedIn.style.marginright = "10px";
linkedIn.style.verticalAlign = "middle";
