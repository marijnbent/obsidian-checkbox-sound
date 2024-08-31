import { Plugin } from 'obsidian';
import { CheckboxSoundSettingTab } from './settings';
import { CheckboxSoundSettings, DEFAULT_SETTINGS } from './types';

export default class CheckboxSound extends Plugin {
    settings: CheckboxSoundSettings;

    async onload() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
        this.addSettingTab(new CheckboxSoundSettingTab(this.app, this));

        console.log('here');
        if (this.settings.playSoundOnTick) {
            console.log('here');
            this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
                const target = evt.target as HTMLElement;

                if (target.tagName === 'INPUT' && target.getAttribute('type') === 'checkbox') {
                    if ((target as HTMLInputElement).checked) {
                        console.log('PING!');
                        this.playSystemSound();
                    }
                }
            });
        }
    }

    playSystemSound() {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

        const oscillator = audioContext.createOscillator();
        oscillator.type = 'triangle';

        oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(440, audioContext.currentTime + 0.15);

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.6);
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}