class HazardAlert {
  final String id;
  final String title;
  final String category; // 'flood', 'landslide', 'fire', 'cyclone', 'earthquake'
  final String severity; // 'critical', 'warning', 'advisory'
  final String location;
  final DateTime timestamp;
  final String instruction;
  final int affectedPopulation;

  HazardAlert({
    required this.id,
    required this.title,
    required this.category,
    required this.severity,
    required this.location,
    required this.timestamp,
    required this.instruction,
    required this.affectedPopulation,
  });

  factory HazardAlert.fromJson(Map<String, dynamic> json) {
    return HazardAlert(
      id: json['id'] ?? '',
      title: json['title'] ?? 'Hazard Alert',
      category: json['category'] ?? 'flood',
      severity: json['severity'] ?? 'warning',
      location: json['location'] ?? 'Current Area',
      timestamp: json['timestamp'] != null 
          ? DateTime.tryParse(json['timestamp']) ?? DateTime.now() 
          : DateTime.now(),
      instruction: json['instruction'] ?? 'Stay vigilant and listen to local emergency broadcasts.',
      affectedPopulation: json['affectedPopulation'] ?? 0,
    );
  }
}

class SensorTelemetry {
  final double riverStageMeters;
  final double riverThresholdMeters;
  final double rainfall24hMm;
  final String rainfallStatus;
  final double porePressureKPa;
  final int aqi;
  final DateTime timestamp;
  final String generalRiskLevel; // 'low', 'moderate', 'high', 'extreme'

  SensorTelemetry({
    required this.riverStageMeters,
    required this.riverThresholdMeters,
    required this.rainfall24hMm,
    required this.rainfallStatus,
    required this.porePressureKPa,
    required this.aqi,
    required this.timestamp,
    required this.generalRiskLevel,
  });

  bool get isRiverOverThreshold => riverStageMeters >= riverThresholdMeters;
  double get riverCapacityPercent => (riverStageMeters / riverThresholdMeters).clamp(0.0, 1.5);
}

class ShelterInfo {
  final String id;
  final String name;
  final String address;
  final double distanceKm;
  final int capacity;
  final int occupied;
  final List<String> amenities;
  final String contactPhone;
  final bool hasMedicalAid;

  ShelterInfo({
    required this.id,
    required this.name,
    required this.address,
    required this.distanceKm,
    required this.capacity,
    required this.occupied,
    required this.amenities,
    required this.contactPhone,
    required this.hasMedicalAid,
  });

  int get availableBeds => (capacity - occupied).clamp(0, capacity);
  double get occupancyRate => capacity > 0 ? (occupied / capacity).clamp(0.0, 1.0) : 0.0;
}

class EvacuationCorridor {
  final String id;
  final String name;
  final String status; // 'clear', 'congested', 'flooded', 'blocked'
  final double distanceKm;
  final int etaMinutes;
  final String hazardWarning;

  EvacuationCorridor({
    required this.id,
    required this.name,
    required this.status,
    required this.distanceKm,
    required this.etaMinutes,
    required this.hazardWarning,
  });

  bool get isSafe => status == 'clear';
}

class CommunityReport {
  final String id;
  final String title;
  final String hazardType;
  final String description;
  final String location;
  final DateTime timestamp;
  final int upvotes;
  final bool isVerified;
  final String reporterName;

  CommunityReport({
    required this.id,
    required this.title,
    required this.hazardType,
    required this.description,
    required this.location,
    required this.timestamp,
    required this.upvotes,
    required this.isVerified,
    required this.reporterName,
  });
}
