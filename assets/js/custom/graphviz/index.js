document.addEventListener("DOMContentLoaded",function(){let e,t,n,o=e=>document.querySelector(e),s=e=>e.json(),r=e=>fetch(`../js/custom/graphviz/${e}`).then(t=>e.match(/[.]json$/)?s(t):(e=>e.text())(t)),i=t=>{"string"==typeof t?e.style().fromString(t).update():e.style().fromJson(t).update()},d=e=>fetch(`../datasets/${e}`).then(s),a=t=>{e.zoom(.001),e.pan({x:-9999999,y:-9999999}),e.elements().remove(),e.add(t)},l={cola:{name:"cola",padding:50,nodeSpacing:12,edgeLengthVal:45,animate:!0,randomize:!0,maxSimulationTime:1500,boundingBox:{x1:0,y1:0,x2:1e4,y2:1e4},edgeLength:function(e){let t=e.data("weight");return null==t&&(t=.5),45/t}}},h=e=>Promise.resolve(l[e]),m=n=>(t&&t.stop(),(t=e.makeLayout(n)).run().promiseOn("layoutstop")),c=()=>Promise.resolve("cola").then(h).then(m),u=o("#algorithm"),v=t=>{switch(t){case"bfs":return Promise.resolve(e.elements().bfs.bind(e.elements()));case"dfs":return Promise.resolve(e.elements().dfs.bind(e.elements()));case"none":default:return Promise.resolve(void 0)}},g=t=>{if(void 0===t)return Promise.resolve(void 0);{let n={root:"#"+e.nodes()[0].id(),goal:"#"+e.nodes()[Math.round(Math.random()*(e.nodes().size()-1))].id()};return Promise.resolve(t(n))}},p=t=>{if(e.$().removeClass("highlighted start end"),n=t,void 0===t||void 0===t.path)return Promise.resolve();{let e=0;return t.distance&&(t.path.first().addClass("highlighted start"),t.path.last().addClass("highlighted end")),new Promise(o=>{let s=()=>{n===t&&e<t.path.length?(t.path[e].addClass("highlighted"),e++,setTimeout(s,500)):o()};s()})}},y=()=>Promise.resolve(u.value).then(v).then(g).then(p);e=window.cy=cytoscape({container:o("#cy")}),(e=>Promise.resolve().then(e))(()=>Promise.resolve("jdk_dependency.json").then(d).then(a)).then(()=>Promise.resolve("style.json").then(r).then(i)).then(c),o("#redo-layout").addEventListener("click",c),u.addEventListener("change",y),o("#redo-algorithm").addEventListener("click",y)}),$(document).ready(()=>$(".tooltip").tooltipster());