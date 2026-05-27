export const manifest = {
  screens: {
    scr_14sa52: { name: "Home", route: "/", position: { "x": 160, "y": 1820 } },
    scr_n89qu2: { name: "All Movies", route: "/movies", position: { "x": 4360, "y": 1820 } },
    scr_6zsbkz: { name: "Movie Details", route: "/movie/1", position: { "x": 1560, "y": 1820 } },
    scr_8jwkiy: { name: "Booking", route: "/booking/1", position: { "x": 2960, "y": 1820 } },
    scr_w7kjna: { name: "Admin Dashboard", route: "/admin", position: { "x": 160, "y": 3800 } }
  },
  sections: {
    sec_2un7qa: { name: "Movie Booking Flow", x: 0, y: 1600, width: 5720, height: 1180 },
    sec_dn4x6h: { name: "Admin", x: 0, y: 3580, width: 1520, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_2un7qa", children: [
    { kind: "screen", id: "scr_14sa52" },
    { kind: "screen", id: "scr_6zsbkz" },
    { kind: "screen", id: "scr_8jwkiy" },
    { kind: "screen", id: "scr_n89qu2" }]
  },
  { kind: "section", id: "sec_dn4x6h", children: [
    { kind: "screen", id: "scr_w7kjna" }]
  }]

};