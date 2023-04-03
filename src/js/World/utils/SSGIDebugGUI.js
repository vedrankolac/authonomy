﻿import { SSGIEffect } from "realism-effects"
import { Pane } from "tweakpane"

export class SSGIDebugGUI {
	constructor(ssgiEffect, params = SSGIEffect.DefaultOptions) {
		const pane = new Pane()
		this.pane = pane
		pane.containerElem_.style.userSelect = "none"
		pane.containerElem_.style.width = "380px"

		pane.on("change", ev => {
			const { presetKey } = ev

			ssgiEffect[presetKey] = ev.value
		})

		params = { ...SSGIEffect.DefaultOptions, ...params }

		const generalFolder = pane.addFolder({ title: "General" })
		generalFolder.addInput(params, "distance", { min: 0.001, max: 10, step: 0.01 })
		generalFolder.addInput(params, "autoThickness")
		generalFolder.addInput(params, "thickness", {
			min: 0,
			max: 5,
			step: 0.01
		})

		generalFolder.addInput(params, "maxRoughness", { min: 0, max: 1, step: 0.01 })
		generalFolder.addInput(params, "envBlur", { min: 0, max: 1, step: 0.01 })
		generalFolder.addInput(params, "importanceSampling")

		const temporalResolveFolder = pane.addFolder({ title: "Temporal Resolve" })

		temporalResolveFolder.addInput(params, "blend", { min: 0, max: 1, step: 0.001 })
		const denoiseFolder = pane.addFolder({ title: "Denoise" })
		denoiseFolder.addInput(params, "denoiseIterations", { min: 0, max: 5, step: 1 })
		denoiseFolder.addInput(params, "denoiseKernel", { min: 1, max: 5, step: 1 })
		denoiseFolder.addInput(params, "denoiseDiffuse", {
			min: 0,
			max: 50,
			step: 0.01
		})
		denoiseFolder.addInput(params, "denoiseSpecular", {
			min: 0,
			max: 50,
			step: 0.01
		})
		denoiseFolder.addInput(params, "depthPhi", {
			min: 0,
			max: 15,
			step: 0.001
		})
		denoiseFolder.addInput(params, "normalPhi", {
			min: 0,
			max: 50,
			step: 0.001
		})
		denoiseFolder.addInput(params, "roughnessPhi", {
			min: 0,
			max: 100,
			step: 0.001
		})

		const definesFolder = pane.addFolder({ title: "Tracing" })

		definesFolder.addInput(params, "steps", { min: 0, max: 256, step: 1 })
		definesFolder.addInput(params, "refineSteps", { min: 0, max: 16, step: 1 })
		definesFolder.addInput(params, "spp", { min: 1, max: 32, step: 1 })
		definesFolder.addInput(params, "missedRays")

		const resolutionFolder = pane.addFolder({ title: "Resolution", expanded: false })
		resolutionFolder.addInput(params, "resolutionScale", { min: 0.25, max: 1, step: 0.25 })
	}
}
