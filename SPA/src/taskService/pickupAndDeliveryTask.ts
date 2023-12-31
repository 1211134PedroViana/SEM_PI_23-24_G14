export default interface PickupAndDeliveryTask {
    code: string;
    pickupPlace: string;
    deliveryPlace: string;
    pickupPersonName: string;
    pickupPersonPhoneNumber: string;
    deliveryPersonName: string;
    deliveryPersonPhoneNumber: string;
    description: string;
    confirmationCode: string;
    status: string;
    userId: string;
}