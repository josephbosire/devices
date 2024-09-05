from ninja import NinjaAPI
from devices.models import Device, Location
from devices.schemas import (
    LocationSchema,
    DeviceSchema,
    DeviceCreateSchema,
    Error,
    UpdateDeviceLocationSchema,
)
from django.shortcuts import get_object_or_404

app = NinjaAPI()


@app.get("devices/", response=list[DeviceSchema])
def get_devices(request):
    return Device.objects.all()


@app.get("devices/{slug}/", response=DeviceSchema)
def get_device(request, slug):
    return get_object_or_404(Device, slug=slug)


@app.post("devices/", response={200: DeviceSchema, 404: Error})
def create_device(request, device: DeviceCreateSchema):
    if device.location_id:
        get_object_or_404(Location, id=device.location_id)
    device_data = device.model_dump()
    new_device = Device.objects.create(**device_data)
    return new_device


@app.post("devices/{device_slug}/set-location/", response=DeviceSchema)
def update_device_location(request, device_slug, location: UpdateDeviceLocationSchema):
    device = get_object_or_404(Device, slug=device_slug)
    if location.location_id:
        location = get_object_or_404(Location, id=location.location_id)
        device.location = location
    else:
        device.location = None
    device.save()
    return device


@app.get("locations/", response=list[LocationSchema])
def get_lcoations(request):
    return Location.objects.all()
