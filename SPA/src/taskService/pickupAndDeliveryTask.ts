export default interface PickupAndDeliveryTask {
    pickupPlace: string;
    deliveryPlace: string;
    pickupPersonName: string;
    pickupPersonPhoneNumber: string;
    deliveryPersonName: string;
    deliveryPersonPhoneNumber: string;
    description: string;
    confirmationCode: string;
    userId: string;
}