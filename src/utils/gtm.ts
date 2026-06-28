type DataLayerEvent = {
  event: string;
  [key: string]: string | number | boolean | undefined;
};

export function pushEvent(data: DataLayerEvent) {
  (window as Window & { dataLayer?: object[] }).dataLayer?.push(data);
}
