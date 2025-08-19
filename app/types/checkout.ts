export interface CheckoutData {
  card: string
  travelClass: string
  price: number
  startDate: string
  title: string
  firstName: string
  lastName: string
  mobilePhone: string
  formattedAddress: string
  dateOfBirth: string
  orderNumber?: string
  addressComponents?: google.maps.GeocoderAddressComponent[]
}
