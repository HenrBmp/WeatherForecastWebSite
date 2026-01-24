const createSVG = (Dpath) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    element.setAttribute("viewBox", "0 -960 960 960");
    const path = document.createElement("path");
    path.setAttribute("d", Dpath);
    element.appendChild(path);

    return element;
};

export {createSVG};