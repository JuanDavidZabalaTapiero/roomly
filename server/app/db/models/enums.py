from enum import Enum


class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"


class ReservationStatus(str, Enum):
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"
