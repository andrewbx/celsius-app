import { hook } from 'cavy';
import { Constants } from 'expo';

const { ENV } = Constants.manifest.extra;

export default {
	hookComponent,
	generateTestHook,
}

function hookComponent(component) {
	if (ENV === 'TEST') return hook(component);
	
	return component;
}

function generateTestHook(component, selector) {
	console.log({ ENV })
	if (ENV === 'TEST') return component.props.generateTestHook(selector);

	return null;
}
