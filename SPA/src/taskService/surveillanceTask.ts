export default interface SurveillanceTask {
    buildingId: string;
    floorIds: string[];
    startPlace: string;
    endPlace: string;
    phoneNumber: string;
    status: string;
    userId: string;
}