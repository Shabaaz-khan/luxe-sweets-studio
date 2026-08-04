let showLoader: (() => void) | null = null;
let hideLoader: (() => void) | null = null;

let activeRequests = 0;

export const registerLoader = (
  show: () => void,
  hide: () => void
) => {
  showLoader = show;
  hideLoader = hide;
};

export const startLoading = () => {
  activeRequests++;

  if (activeRequests === 1) {
    showLoader?.();
  }
};

export const stopLoading = () => {
  activeRequests--;

  if (activeRequests <= 0) {
    activeRequests = 0;
    hideLoader?.();
  }
};