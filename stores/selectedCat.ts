export const useSelectedCatStore = defineStore('selectedCat',{
  state: () => ({
    selectedCat: null as string | null,
  }),
  getters: {
    getSelectedCat(): string | null {
      return this.selectedCat;
    },
  },
  actions: {
    setSelectedCat(value: string): void {
      this.selectedCat = value;
    },
  },
});
