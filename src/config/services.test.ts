import { describe, expect, it } from "vitest";
import {
  services,
  serviceGroups,
  confirmedServices,
  serviceBySlug,
  servicesByGroup,
} from "./services";

describe("service registry", () => {
  it("uses unique ids and slugs", () => {
    expect(new Set(services.map((s) => s.id)).size).toBe(services.length);
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length);
  });

  it("resolves every slug back to its definition", () => {
    for (const service of services) {
      expect(serviceBySlug(service.slug)?.id).toBe(service.id);
    }
    expect(serviceBySlug("does-not-exist")).toBeUndefined();
  });

  it("groups cover the registry exactly once", () => {
    const grouped = serviceGroups.flatMap((group) => group.serviceIds).sort();
    expect(grouped).toEqual(services.map((s) => s.id).sort());
  });

  it("agrees on group membership between registry and groups", () => {
    for (const service of services) {
      const group = serviceGroups.find((g) => g.id === service.group);
      expect(group?.serviceIds, service.id).toContain(service.id);
    }
  });

  it("exposes only confirmed services to the UI helpers", () => {
    const confirmed = confirmedServices();
    expect(confirmed.length).toBeGreaterThan(0);
    expect(confirmed.every((s) => s.confirmed)).toBe(true);
    for (const group of serviceGroups) {
      expect(servicesByGroup(group.id).every((s) => s.group === group.id)).toBe(true);
    }
  });
});
