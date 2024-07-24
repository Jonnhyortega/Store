export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromLocalStorage = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
};


// export let arrayCart = JSON.parse(localStorage.getItem("arrayCart")) || [];
// export let arrayProfiles = JSON.parse(localStorage.getItem("arrayProfiles")) || [];

// export const saveToLocalStorage = () => {
//   localStorage.setItem("arrayCart", JSON.stringify(arrayCart));
// };

// export const saveToLocalStorageProfiles = () => {
//   localStorage.setItem("arrayProfiles", JSON.stringify(arrayProfiles));
// };