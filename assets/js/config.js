var config = {};

config.base = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src='http://www.psdgraphics.com/file/colorful-triangles-background.jpg' />"}
    ]
};

config.buckets = {
    type: "environment",
    states: [
        {name: "default", representation:""}
    ],
    locations: [
        {
            name: "bucket1",
            states: [
                {name: "default", representation: "<ul></ul>"}
            ]
        },
        {
            name: "bucket2",
            states: [
                {name: "default", representation: "<ul></ul>"}
            ]
        }
    ]
};