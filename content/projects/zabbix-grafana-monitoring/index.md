---
title: "Distributed Infrastructure Monitoring"
subtitle: "Building a Centralized Monitoring System with Zabbix and Grafana"
date: 2026-11-12
draft: false
author: "Muhammad Nurfaisal"
description: "A three-VM infrastructure monitoring lab using Zabbix 7.0 LTS, Zabbix Agent, and Grafana on Ubuntu Server 22.04 LTS."
thumbnail: "/images/projects/zabbix-grafana/architecture.svg"
project_type: "Infrastructure Monitoring"
tech_stack:
  - "Zabbix 7.0 LTS"
  - "Grafana"
  - "Ubuntu Server 22.04 LTS"
  - "VMware Workstation"
tags: ["infrastructure", "monitoring", "zabbix", "grafana", "linux", "sysadmin"]
---

![Zabbix and Grafana Monitoring Architecture](/images/projects/zabbix-grafana/architecture.svg)

<div class="project-meta">
  <span class="project-meta-item">LAB PROJECT</span>
  <span class="project-meta-item">VMWARE WORKSTATION</span>
  <span class="project-meta-item">UBUNTU SERVER 22.04 LTS</span>
  <span class="project-meta-item">ZABBIX 7.0 LTS</span>
  <span class="project-meta-item">GRAFANA</span>
</div>


## Project Overview

This project was implemented and tested in a three-VM environment using VMware Workstation. The monitoring setup successfully monitored two Linux hosts through Zabbix and visualized infrastructure metrics using Grafana. Although the lab environment is no longer active, its architecture, implementation details, and dashboard evidence are documented as a completed hands-on project.

## Infrastructure Architecture

The monitoring environment consists of three virtual machines running on VMware Workstation.

<div class="infrastructure-grid">

  <div class="infrastructure-card">
    <div class="infrastructure-card-header">
      <span class="vm-label">VM 01</span>
      <span class="vm-status">MONITORING</span>
    </div>
    <h3>Zabbix Server</h3>
    <p class="vm-description">Centralized monitoring server</p>
    <div class="vm-specs">
      <div><span>vCPU</span><strong>2 Core</strong></div>
      <div><span>Memory</span><strong>2 GB RAM</strong></div>
    </div>
    <div class="vm-ip">
      <span>HOST-ONLY IP</span>
      <code>10.10.10.11</code>
    </div>
    <p class="vm-services">Zabbix Server 7.0 · MariaDB · Nginx</p>
  </div>

  <div class="infrastructure-card">
    <div class="infrastructure-card-header">
      <span class="vm-label">VM 02</span>
      <span class="vm-status monitored">MONITORED HOST</span>
    </div>
    <h3>Zabbix Agent</h3>
    <p class="vm-description">Remote Linux monitoring target</p>
    <div class="vm-specs">
      <div><span>vCPU</span><strong>1 Core</strong></div>
      <div><span>Memory</span><strong>2 GB RAM</strong></div>
    </div>
    <div class="vm-ip">
      <span>HOST-ONLY IP</span>
      <code>10.10.10.21</code>
    </div>
    <p class="vm-services">CPU · Memory · Disk · Network</p>
  </div>

  <div class="infrastructure-card">
    <div class="infrastructure-card-header">
      <span class="vm-label">VM 03</span>
      <span class="vm-status">VISUALIZATION</span>
    </div>
    <h3>Grafana Server</h3>
    <p class="vm-description">Monitoring visualization platform</p>
    <div class="vm-specs">
      <div><span>vCPU</span><strong>2 Core</strong></div>
      <div><span>Memory</span><strong>2 GB RAM</strong></div>
    </div>
    <div class="vm-ip">
      <span>HOST-ONLY IP</span>
      <code>10.10.10.31</code>
    </div>
    <p class="vm-services">Grafana · Zabbix Plugin · Dashboards</p>
  </div>

</div>

<div class="infrastructure-summary">
  <span class="summary-label">TOTAL ALLOCATED RESOURCES</span>
  <div class="summary-values">
    <strong>5 vCPU</strong>
    <span>·</span>
    <strong>6 GB RAM</strong>
  </div>
  <p>3 Virtual Machines · Ubuntu Server 22.04 LTS</p>
</div>

### Network Design

Each virtual machine uses two network adapters:

- **VMnet8 (NAT):** Provides external network connectivity for package installation and system updates.
- **Host-only:** Provides isolated internal communication between the virtual machines and the host.

The internal monitoring network uses the `10.10.10.0/24` subnet.

**Host-only IP Addressing:**

| Virtual Machine | Role | IP Address |
|---|---|---|
| VM1 | Zabbix Server | `10.10.10.11` |
| VM2 | Zabbix Agent | `10.10.10.21` |
| VM3 | Grafana Server | `10.10.10.31` |

**Monitoring Communication:**

| Source | Destination | Port | Purpose |
|---|---|---|---|
| VM2 | VM1 | TCP 10051 | Zabbix Agent active checks |
| VM1 | VM2 | TCP 10050 | Zabbix Agent passive checks |
| VM3 | VM1 | TCP 80 | Zabbix API access |

The required ports depend on the configured communication mode and service configuration.

## Technology Stack

- Ubuntu Server 22.04 LTS
- VMware Workstation
- Zabbix Server 7.0 LTS
- Zabbix Agent
- MariaDB
- Nginx
- Grafana
- Zabbix API Integration

## Implementation Highlights

The project was implemented in three stages, covering monitoring server deployment, remote host configuration, and dashboard integration.

<div class="implementation-grid">

  <div class="implementation-card">
    <div class="implementation-number">01</div>
    <span class="implementation-label">SERVER DEPLOYMENT</span>
    <h3>Zabbix Server Deployment</h3>
    <p>
      Deployed Zabbix Server 7.0 LTS on Ubuntu Server 22.04 LTS
      with MariaDB as the database backend and Nginx as the web frontend.
    </p>
    <ul>
      <li>Installed and configured Zabbix Server</li>
      <li>Created and configured the MariaDB database</li>
      <li>Configured Nginx for Zabbix web access</li>
    </ul>
  </div>

  <div class="implementation-card">
    <div class="implementation-number">02</div>
    <span class="implementation-label">HOST MONITORING</span>
    <h3>Remote Host Monitoring</h3>
    <p>
      Configured a separate Ubuntu Linux VM as a monitoring target
      and connected it to the centralized Zabbix server using Zabbix Agent.
    </p>
    <ul>
      <li>Installed and configured Zabbix Agent</li>
      <li>Registered the remote Linux host in Zabbix</li>
      <li>Applied Linux monitoring templates</li>
    </ul>
  </div>

  <div class="implementation-card">
    <div class="implementation-number">03</div>
    <span class="implementation-label">DATA VISUALIZATION</span>
    <h3>Grafana Integration</h3>
    <p>
      Deployed Grafana on a separate VM and connected it
      to Zabbix through API integration for monitoring data visualization.
    </p>
    <ul>
      <li>Installed the Grafana Zabbix plugin</li>
      <li>Configured the Zabbix API data source</li>
      <li>Imported and configured monitoring dashboards</li>
    </ul>
  </div>

</div>

## Monitoring Dashboard Gallery

The monitoring dashboards provide visibility into the health and resource utilization of both the Zabbix Server and the remote Linux host.

<div class="dashboard-gallery">

  <figure class="dashboard-item dashboard-featured">
    <img
      src="/images/projects/zabbix-grafana/zabbix-srv.png"
      alt="Grafana dashboard displaying Zabbix Server CPU, memory, disk, and network metrics"
      loading="lazy"
      decoding="async">
    <figcaption>
      <strong>Zabbix Server</strong>
      <span>Infrastructure resource monitoring and host health overview</span>
    </figcaption>
  </figure>

  <figure class="dashboard-item dashboard-featured">
    <img
      src="/images/projects/zabbix-grafana/vm2-client.png"
      alt="Grafana dashboard displaying monitored VM2 client metrics"
      loading="lazy"
      decoding="async">
    <figcaption>
      <strong>Remote Linux Host — VM 02</strong>
      <span>CPU, memory, disk, and network monitoring</span>
    </figcaption>
  </figure>

  <figure class="dashboard-item">
    <img
      src="/images/projects/zabbix-grafana/zabcon.png"
      alt="Zabbix and Grafana integration configuration"
      loading="lazy"
      decoding="async">
    <figcaption>
      <strong>Data Source Integration</strong>
      <span>Connecting Grafana with the Zabbix API</span>
    </figcaption>
  </figure>

  <figure class="dashboard-item">
    <img
      src="/images/projects/zabbix-grafana/confinish.png"
      alt="Successful Zabbix and Grafana integration confirmation"
      loading="lazy"
      decoding="async">
    <figcaption>
      <strong>Integration Verification</strong>
      <span>Successful connection to the Zabbix API, confirmed by Grafana.</span>
    </figcaption>
  </figure>

</div>

## Key Takeaways

- Designed and deployed a three-VM infrastructure monitoring environment using VMware Workstation.
- Configured Zabbix to monitor two Linux hosts from a centralized monitoring server.
- Integrated Grafana with Zabbix through API connectivity for infrastructure visualization.
- Configured Linux services, MariaDB, Nginx, firewall rules, and internal network communication.
- Built monitoring dashboards to visualize CPU, memory, disk, and network utilization.
- Documented the architecture, implementation process, and monitoring results as a completed hands-on lab project.


## Technical Documentation

Want to reproduce this monitoring environment?

Explore the complete installation and configuration walkthrough, including Zabbix Server deployment, agent configuration, and Grafana integration.

<div class="project-cta">
  <div class="project-cta-content">
    <span class="project-cta-label">STEP-BY-STEP TUTORIAL</span>
    <h3>Build Your Own Monitoring Stack</h3>
    <p>
      Follow the original technical guide to build a centralized
      monitoring system using Zabbix and Grafana.
    </p>
    <a
      class="project-cta-button"
      href="/posts/building-a-complete-monitoring-system-with-zabbix-and-grafana/">
      Read Technical Documentation
      <span aria-hidden="true">→</span>
    </a>
  </div>
</div>
