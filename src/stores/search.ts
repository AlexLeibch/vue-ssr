import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export type Data = {
    boundingbox: Array<number>;
    class: string;
    boundary: string;
    display_name: string;
    icon: string;
    importance: number;
    licence: string;
    lon: number;
    osm_id: number;
    osm_type: string;
    place_id: number;
    type: string;
};
export const useStore = defineStore("data", () => {
    const storeData = ref([] as Data[]);
    async function fetchData(searchText: string) {
        let result = await axios.get("https://nominatim.openstreetmap.org/search", { params: { q: searchText, format: "json", polygon_geojson: 0 } });
        storeData.value = result.data;
        console.log(storeData.value);
    }
    return { storeData, fetchData };
});
