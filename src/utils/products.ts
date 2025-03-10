interface Size {
    id: string;
    size: string;
}

interface Product {
    id: string;
    title: string;
    productType: string;
    size: Size[];
    windowed?: boolean; // optional property
}


export const Products: Product[] = [
    {
        id: "9",
        title: "Bi-Fold Self-Mailers",
        productType: "Bi-Fold Self-Mailers",
        size: [
            {
                id: "9",
                size: "6x18"
            }
        ],
    },
    {
        id: "5",
        title: "Personal Letters",
        productType: "Personal Letters",
        size: [
            {
                id: "5",
                size: "8.5x5.5"
            }
        ]
    },
    {
        id: "13",
        title: "Postcards",
        productType: "Postcards",
        size: [
            {
                id: "13",
                size: "4x6"
            },
            {
                id: "15",
                size: "6x11"
            },
            {
                id: "14",
                size: "6x9"
            }
        ]
    },
    {
        id: "16",
        title: "Real Penned Letter",
        productType: "Real Penned Letter",
        size: [
            {
                id: "16",
                size: "8.5x5.5"
            }
        ]
    },
    {
        id: "11",
        title: "Tri-Fold Self-Mailers",
        productType: "Tri-Fold Self-Mailers",
        size: [
            {
                id: "11",
                size: "12x9"
            }
        ]
    },
    {
        id: "2",
        title: "Professional Letters - Windowed Envelope",
        productType: "Professional Letters",
        size: [
            {
                id: "2",
                size: "11x8.5"
            }
        ],
        windowed: true
    },
    {
        id: "4",
        title: "Professional Letters - Non-windowed Envelope",
        productType: "Professional Letters",
        size: [
            {
                id: "4",
                size: "11x8.5"
            }
        ],
        windowed: false
    },
    {
        id: "18",
        title: "Snap Pack Mailers",
        productType: "Snap Pack Mailers",
        size: [
            {
                id: "18",
                size: "11x8.5"
            }
        ]
    }
];