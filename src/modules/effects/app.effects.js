angular.module('module.effects', [])
    .value('effects', [
        {
            name: 'vignette',
            label: 'Vignetta',
            description: 'Adds a decorated border that softly fades at the edges of a picture so that the viewer\'s attention is drawn to the center of the image.',
            config: [
                {
                    name: 'amount',
                    type: "range",
                    min: 0,
                    step: 1,
                    max: 200,
                    value: 12
                }
            ]
        },
        {
            name: 'edge',
            label: 'Edge Detection',
            description: 'Detects edges',
            config: [
                {
                    name: "mode",
                    type: "select",
                    options: ["sobel", "frei-chen"],
                    value: "sobel"
                }
            ]
        },
        {
            name: 'blur',
            label: 'Gaussian Blur',
            description: 'Add blur',
            config: [
                {
                    name: "amount",
                    type: "range",
                    step: 0.001,
                    min: 0,
                    max: 1,
                    value: 0.2
                }, {
                    name: "blendGamma",
                    type: "range",
                    step: 0.01,
                    min: 0,
                    max: 4,
                    value: 2.2
                }
            ]
        }
    ]);