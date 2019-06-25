export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },

    {
      title: true,
      name: "Contents",
      wrapper: {
        element: "",
        attributes: {}
      }
    },
    {
      name: "Projects",
      url: "/base",
      icon: "icon-puzzle",
      children: [
        {
          name: "Create a Project",
          url: "/base/createproject",
          icon: "icon-puzzle"
        },
        {
          name: "All projects",
          url: "/base/allprojects",
          icon: "icon-puzzle"
        }
      ]
    }
  ]
};
