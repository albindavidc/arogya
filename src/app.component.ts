import { ChangeDetectionStrategy, Component, signal, computed, effect, inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PoseCategory, Pose } from './models/pose.model';
import { PoseDetailModalComponent } from './pose-detail-modal.component';
import { WarmUpComponent } from './warm-up.component';

@Component({
  selector: 'app-root',
  template: `
<div class="min-h-screen">

  @if (!showWarmUpView()) {
    <!-- Header -->
    <header class="bg-black/30 backdrop-blur-lg sticky top-0 z-30 border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gradient-primary">Arogya</h1>
            <p class="text-[#6E6E7A] text-xs md:text-sm">Nourish Your Inner Fire</p>
          </div>

          <div class="flex items-center gap-4 md:gap-6">
            <nav class="hidden md:flex items-center space-x-6">
              @for(category of poseCategories(); track category.id) {
                <button (click)="scrollTo(category.id)" class="text-xs md:text-sm font-medium text-[#B8B8C4] hover:text-white transition-colors">{{ category.title.split(':')[0] }}</button>
              }
              <button (click)="scrollTo('top5')" class="text-xs md:text-sm font-medium text-[#B8B8C4] hover:text-white transition-colors">Top 5</button>
            </nav>
          </div>

        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Intro Section -->
      <section class="relative text-center mb-16 py-20 overflow-hidden">
        <p class="quote text-lg md:text-xl italic text-accent-glow mb-6">
          "Think wisely, act smartly, live peacefully."
        </p>
        <h2 class="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F4F8]" style="text-shadow: 0 0 40px rgba(180, 160, 232, 0.3);">
          Revitalize Your Body & Mind
        </h2>

        <!-- Gender Toggle -->
        <div class="flex justify-center my-10">
          <div class="flex items-center space-x-2 bg-black/20 p-1 rounded-full border border-white/10">
            <button (click)="setGender('female')" 
                    [class]="'px-4 py-1.5 text-sm md:text-base rounded-full transition-all duration-300 relative ' + (selectedGender() === 'female' ? 'text-white' : 'text-[#B8B8C4] hover:text-white')">
              @if(selectedGender() === 'female') {
                <span class="absolute inset-0 rounded-full active-gender-glow opacity-30 blur-md"></span>
                <span class="absolute inset-0 rounded-full border border-white/50"></span>
              }
              <span class="relative">Female Poses</span>
            </button>
            <button (click)="setGender('male')" 
                    [class]="'px-4 py-1.5 text-sm md:text-base rounded-full transition-all duration-300 relative ' + (selectedGender() === 'male' ? 'text-white' : 'text-[#B8B8C4] hover:text-white')">
               @if(selectedGender() === 'male') {
                <span class="absolute inset-0 rounded-full active-gender-glow opacity-30 blur-md"></span>
                <span class="absolute inset-0 rounded-full border border-white/50"></span>
              }
              <span class="relative">Male Poses</span>
            </button>
          </div>
        </div>
        
        <p class="text-base md:text-lg leading-7 text-[#B8B8C4] max-w-2xl mx-auto">
          Discover a curated collection of yoga poses scientifically known to improve metabolism, energy, hormonal balance, and digestive power.
        </p>

        <button (click)="showWarmUp()" class="mt-8 bg-transparent font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 button-outline-accent focus-ring-accent text-sm md:text-base">
          Start & End with a Warm-Up
        </button>
      </section>

      <!-- Sample Card Structure / Legend -->
      <section class="max-w-md mx-auto mb-20 relative">
        <div class="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur opacity-25"></div>
        <div class="relative bg-black/60 border border-dashed border-white/20 rounded-xl p-6">
          <h3 class="text-center text-[#B8B8C4] text-xs font-bold uppercase tracking-widest mb-4">Card Structure Guide</h3>
          <!-- The Sample Card -->
          <div class="bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl shadow-lg shadow-black/30 flex flex-col mx-auto max-w-[280px] pointer-events-none select-none">
             <figure class="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/10 rounded-t-xl flex items-center justify-center relative">
               <span class="text-white/20 text-4xl font-serif italic">Photo</span>
               <!-- Step/Variations Badge - Top Left -->
               <div class="absolute top-2 left-2 bg-black/60 backdrop-blur-md border border-white/10 text-[#F4F4F8] text-[10px] font-bold px-2 py-1.5 rounded-lg shadow-sm flex flex-col gap-0.5 leading-none text-left">
                 <span>S: Steps</span>
                 <span>V: Variations</span>
               </div>
               <!-- Reference Schedule Badge - Moved to Right -->
               <div class="absolute top-2 right-2 bg-black/50 backdrop-blur-md border border-white/10 text-[#F4F4F8] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                 Days
               </div>
             </figure>
             <div class="p-4 flex flex-col flex-grow">
                <!-- Header -->
                <div class="mb-3">
                  <h3 class="text-sm font-bold text-[#F4F4F8] leading-tight flex flex-col gap-0.5">
                    <span>Sanskrit Name</span>
                    <span class="text-[#B8B8C4] font-normal text-xs opacity-80">(Sanskrit Pronunciation)</span>
                  </h3>
                  <p class="text-xs text-accent mt-1 font-medium">English Name</p>
                </div>
                
                <!-- Details -->
                <div class="mt-auto space-y-2 text-[10px] sm:text-xs">
                   <div class="flex items-start gap-2 text-[#B8B8C4]">
                       <span class="text-accent opacity-80">💨</span>
                       <span>Pranayama (Breath)</span>
                   </div>
                   <div class="flex items-start gap-2 text-[#B8B8C4]">
                       <span class="text-accent opacity-80">🙏</span>
                       <span>Mudra (Hand Gesture)</span>
                   </div>
                   <div class="flex items-start gap-2 text-[#B8B8C4]">
                       <span class="text-accent opacity-80">⏱️</span>
                       <span>Duration</span>
                   </div>
                </div>

                <!-- Tag -->
                <div class="mt-3 pt-3 border-t border-white/5">
                  <span class="inline-block bg-gradient-to-r from-[#A0E8C8]/5 to-[#A0C8E8]/5 border border-[#A0E8C8]/20 text-[#A0E8C8] text-[10px] font-medium px-2 py-0.5 rounded-full">
                    Unique Benefit
                  </span>
                </div>
             </div>
          </div>
        </div>
      </section>
      
      <!-- Pose Categories -->
      @for (category of poseCategories(); track category.id; let catIndex = $index) {
        <section [id]="category.id" class="mb-20 scroll-mt-20">
          <div class="mb-6 flex gap-4">
             <div class="w-1.5 rounded-full category-bar-gradient" style="filter: blur(2px);"></div>
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-[#F4F4F8]">{{ category.title }}</h2>
              <p class="text-[#B8B8C4] mt-1 text-sm md:text-base">{{ category.description }}</p>
            </div>
          </div>
          
          <!-- UPDATED GRID: 5 columns on XL, adjusted gaps and text sizes -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            @for (pose of category.poses; track pose.sanskritName; let poseIndex = $index) {
              <!-- Sub Category Header -->
              @if (pose.subCategory && (poseIndex === 0 || pose.subCategory !== category.poses[poseIndex - 1].subCategory)) {
                <div class="col-span-full mt-4 mb-2 pt-4 first:pt-0 border-b border-white/5 pb-2">
                    <h3 class="text-sm md:text-base font-bold text-accent flex items-center gap-2 uppercase tracking-wider">
                        <span class="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(180,160,232,0.8)]"></span>
                        {{ pose.subCategory }}
                    </h3>
                </div>
              }

              <div (click)="openModal(pose)" 
                  class="group relative transition-all duration-300 hover:-translate-y-1.5 cursor-pointer h-full">
                <div class="holo-border-container h-full">
                    <div class="bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl h-full shadow-lg shadow-black/30 flex flex-col">
                      <!-- Updated conditional styling for Phase 4 (Inversions) or Surya Namaskar -->
                      <figure [class]="category.id === 'phase4' ? 'overflow-hidden rounded-t-xl relative' : 'aspect-[4/3] overflow-hidden rounded-t-xl relative'">
                        <img [src]="selectedGender() === 'male' && pose.imageUrlMale ? pose.imageUrlMale : pose.imageUrl" [alt]="pose.englishName" width="400" height="300" class="w-full object-cover transition-transform duration-300 group-hover:scale-105" [class.h-full]="category.id !== 'phase4'" />
                        
                        <!-- Step Badge - Top Left -->
                        @if (getStepValue(pose.schedule); as step) {
                          <div class="absolute top-2 left-2 bg-black/50 backdrop-blur-md border border-white/10 text-[#F4F4F8] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
                            {{ step }}
                          </div>
                        }

                        <!-- Schedule Badge - Moved to Right -->
                        @let scheduleText = getScheduleDisplay(pose.schedule);
                        @if (scheduleText) {
                          <div class="absolute top-2 right-2 bg-black/50 backdrop-blur-md border border-white/10 text-[#F4F4F8] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
                            {{ scheduleText }}
                          </div>
                        }
                      </figure>
                      <div class="p-4 flex flex-col flex-grow">
                        <!-- Header Section -->
                        <div class="mb-3">
                          <h3 class="text-sm font-bold text-[#F4F4F8] leading-tight flex flex-col gap-0.5">
                            <span>{{ pose.sanskritName }}</span>
                            <span class="text-[#B8B8C4] font-normal text-xs opacity-80">({{ pose.pronunciation }})</span>
                          </h3>
                          <p class="text-xs text-accent mt-1 font-medium">{{ pose.englishName }}</p>
                        </div>
                        
                        <!-- Details Grid -->
                        <div class="mt-auto space-y-2 text-[10px] sm:text-xs">
                           <!-- Pranayama -->
                           @if (pose.pranayama && pose.pranayama.length > 0) {
                            <div class="flex items-start gap-2 text-[#B8B8C4]">
                                <span class="text-accent opacity-80" title="Pranayama">💨</span>
                                <span>{{ pose.pranayama.join(' / ') }}</span>
                            </div>
                           }
                           
                           <!-- Mudra -->
                           @if (pose.mudra && pose.mudra.length > 0 && pose.mudra[0] !== 'None') {
                             <div class="flex items-start gap-2 text-[#B8B8C4]">
                                 <span class="text-accent opacity-80" title="Mudra">🙏</span>
                                 <span>{{ pose.mudra.join(', ') }}</span>
                             </div>
                           }
                           
                           <!-- Duration -->
                           @if (pose.frequency.length > 0) {
                              <div class="flex items-start gap-2 text-[#B8B8C4]">
                                 <span class="text-accent opacity-80" title="Duration">⏱️</span>
                                 <span>{{ pose.frequency[0].duration || 'As per comfort' }}</span>
                              </div>
                           }
                        </div>

                        <!-- Benefit Tag -->
                        <div class="mt-3 pt-3 border-t border-white/5">
                          <span class="inline-block bg-gradient-to-r from-[#A0E8C8]/5 to-[#A0C8E8]/5 border border-[#A0E8C8]/20 text-[#A0E8C8] text-[10px] font-medium px-2 py-0.5 rounded-full truncate max-w-full">
                            {{ pose.benefit }}
                          </span>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            }
          </div>
        </section>
      }

      <!-- Top 5 Section -->
      <section id="top5" class="mb-20 bg-black/30 border border-white/5 rounded-xl p-8 lg:p-12 scroll-mt-20">
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-[#F4F4F8]">
            <span class="text-yellow-400 mr-2">🌟</span>Top 5 for the Fastest Results
          </h2>
          <p class="text-[#B8B8C4] mt-2 max-w-2xl mx-auto text-sm md:text-base">If you want the most effective poses to kickstart your journey, focus on these.</p>
        </div>
        
        <!-- Updated Top 5 Grid to match standard card layout -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          @for (pose of topPoses(); track pose.sanskritName) {
            <div (click)="openModal(pose)" class="group relative transition-all duration-300 hover:-translate-y-1.5 cursor-pointer h-full">
               <div class="holo-border-container h-full">
                    <div class="bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl h-full shadow-lg shadow-black/30 flex flex-col">
                      <!-- Special Glow for Top 5 -->
                      <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-[#E8A0BF]/10 to-[#B4A0E8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                      <figure class="aspect-[4/3] overflow-hidden rounded-t-xl relative">
                        <img [src]="selectedGender() === 'male' && pose.imageUrlMale ? pose.imageUrlMale : pose.imageUrl" [alt]="pose.englishName" width="400" height="300" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                         <!-- Top 5 Badge - Moved to Left -->
                         <div class="absolute top-2 left-2 bg-yellow-400/90 backdrop-blur-md border border-yellow-200/50 text-black text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
                             TOP 5
                         </div>
                         
                         <!-- Step Badge (if any) - Below Top 5 or Next to it? Let's put it below for now or next to it. 
                              Actually, Top 5 badge is absolute top-2 left-2. 
                              If we have a step badge, it might overlap. 
                              Let's put step badge at top-2 left-16 (offset) or similar if Top 5 exists.
                              Or just put it top-8 left-2?
                              Let's try top-8 left-2 for Top 5 items if step exists.
                          -->
                         @if (getStepValue(pose.schedule); as step) {
                           <div class="absolute top-8 left-2 bg-black/50 backdrop-blur-md border border-white/10 text-[#F4F4F8] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
                             {{ step }}
                           </div>
                         }

                         <!-- Schedule Badge for Top 5 - Moved to Right -->
                         @let scheduleTextTop5 = getScheduleDisplay(pose.schedule);
                         @if (scheduleTextTop5) {
                          <div class="absolute top-2 right-2 bg-black/50 backdrop-blur-md border border-white/10 text-[#F4F4F8] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
                            {{ scheduleTextTop5 }}
                          </div>
                        }
                      </figure>
                      
                      <div class="p-4 flex flex-col flex-grow relative z-10">
                        <div class="mb-3">
                          <h3 class="text-sm font-bold text-[#F4F4F8] leading-tight flex flex-col gap-0.5">
                            <span>{{ pose.sanskritName }}</span>
                            <span class="text-[#B8B8C4] font-normal text-xs opacity-80">({{ pose.pronunciation }})</span>
                          </h3>
                          <p class="text-xs text-accent mt-1 font-medium">{{ pose.englishName }}</p>
                        </div>
                        
                         <div class="mt-auto space-y-2 text-[10px] sm:text-xs">
                           <!-- Pranayama -->
                           @if (pose.pranayama && pose.pranayama.length > 0) {
                            <div class="flex items-start gap-2 text-[#B8B8C4]">
                                <span class="text-accent opacity-80">💨</span>
                                <span>{{ pose.pranayama.join(' / ') }}</span>
                            </div>
                           }
                           
                           <!-- Mudra -->
                           @if (pose.mudra && pose.mudra.length > 0 && pose.mudra[0] !== 'None') {
                             <div class="flex items-start gap-2 text-[#B8B8C4]">
                                 <span class="text-accent opacity-80">🙏</span>
                                 <span>{{ pose.mudra.join(', ') }}</span>
                             </div>
                           }
                           
                           <!-- Duration -->
                           @if (pose.frequency.length > 0) {
                              <div class="flex items-start gap-2 text-[#B8B8C4]">
                                 <span class="text-accent opacity-80">⏱️</span>
                                 <span>{{ pose.frequency[0].duration || 'As per comfort' }}</span>
                              </div>
                           }
                        </div>

                         <div class="mt-3 pt-3 border-t border-white/5">
                          <span class="inline-block bg-gradient-to-r from-[#A0E8C8]/5 to-[#A0C8E8]/5 border border-[#A0E8C8]/20 text-[#A0E8C8] text-[10px] font-medium px-2 py-0.5 rounded-full truncate max-w-full">
                            {{ pose.benefit }}
                          </span>
                        </div>
                      </div>
                    </div>
               </div>
            </div>
          }
        </div>
      </section>

      <!-- Pranayama Table Section -->
      <section id="pranayama" class="mb-20 bg-black/30 border border-white/5 rounded-xl p-6 lg:p-10 scroll-mt-20">
        <h2 class="text-2xl md:text-3xl font-bold text-[#F4F4F8] mb-8 border-b border-white/10 pb-4">
          Complete Pranayama Reference Table
        </h2>

        <!-- Responsive Table Wrapper -->
        <div class="overflow-x-auto custom-scrollbar mb-10 border border-white/10 rounded-lg">
          <table class="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr class="bg-white/5 text-accent border-b border-white/10">
                <th class="p-4 font-bold text-xs uppercase tracking-wider w-1/5">Name</th>
                <th class="p-4 font-bold text-xs uppercase tracking-wider w-24">Ratio</th>
                <th class="p-4 font-bold text-xs uppercase tracking-wider w-28">Level</th>
                <th class="p-4 font-bold text-xs uppercase tracking-wider w-1/3">Instruction Sequence</th>
                <th class="p-4 font-bold text-xs uppercase tracking-wider">Benefits</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              @for(technique of breathingTechniques; track technique.name; let i = $index) {
                <!-- Category Header Row -->
                @if(i === 0 || technique.category !== breathingTechniques[i-1].category) {
                  <tr class="bg-white/10">
                    <td colspan="5" class="p-3 text-sm font-bold text-accent tracking-widest uppercase border-y border-white/10 pl-6">
                      {{ technique.category }}
                    </td>
                  </tr>
                }
                
                <tr class="hover:bg-white/[0.03] transition-colors">
                  <td class="p-4 text-sm font-semibold text-[#F4F4F8]">{{ technique.name }}</td>
                  <td class="p-4 text-xs text-[#B8B8C4]">{{ technique.ratio }}</td>
                  <td class="p-4 text-xs">
                    <span [class]="'px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wide border ' + 
                      (technique.level.includes('Adv') ? 'border-fuchsia-500/30 text-fuchsia-300 bg-fuchsia-500/10' : 
                      (technique.level.includes('Int') ? 'border-sky-500/30 text-sky-300 bg-sky-500/10' : 
                      'border-green-500/30 text-green-300 bg-green-500/10'))">
                      {{ technique.level }}
                    </span>
                  </td>
                  <!-- Updated to use [innerHTML] for bold formatting -->
                  <td class="p-4 text-sm text-[#B8B8C4] font-mono leading-relaxed" [innerHTML]="technique.sequence"></td>
                  <td class="p-4 text-sm text-[#B8B8C4] italic">{{ technique.benefits }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Legend & Notes Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-sm">
           <!-- Legend -->
           <div class="bg-white/[0.02] border border-white/5 rounded-lg p-5">
             <h3 class="text-[#F4F4F8] font-bold mb-3 uppercase tracking-wider text-xs">Sequence Notation</h3>
             <ul class="space-y-1.5 text-[#B8B8C4]">
               <li><strong class="text-white">Nose:</strong> Nasal passage (inhale/exhale)</li>
               <li><strong class="text-white">Mouth:</strong> Oral passage (specific techniques)</li>
               <li><strong class="text-white">Lungs:</strong> Complete lung filling</li>
               <li><strong class="text-white">Belly:</strong> Abdominal/diaphragmatic region</li>
               <li><strong class="text-white">Hold in:</strong> Antar Kumbhaka (retention after inhale)</li>
               <li><strong class="text-white">Hold empty:</strong> Bahir Kumbhaka (retention after exhale)</li>
               <li><strong class="text-white">→ :</strong> Direction of breath flow</li>
               <li><strong class="text-white">| :</strong> Alternation point</li>
             </ul>
           </div>

           <!-- Bandhas -->
           <div class="bg-white/[0.02] border border-white/5 rounded-lg p-5">
             <h3 class="text-[#F4F4F8] font-bold mb-3 uppercase tracking-wider text-xs">The 3 Bandhas (Energy Locks)</h3>
             <p class="text-[#B8B8C4] mb-2 text-xs">Used in advanced practices with breath retention:</p>
             <ul class="space-y-1.5 text-[#B8B8C4]">
               <li><span class="text-accent">1. Jalandhara Bandha:</span> Chin to chest (Throat Lock)</li>
               <li><span class="text-accent">2. Uddiyana Bandha:</span> Navel drawn in and up (Abdominal Lock)</li>
               <li><span class="text-accent">3. Mula Bandha:</span> Perineum lifted (Root Lock)</li>
               <li class="pt-1 border-t border-white/10 mt-1"><strong class="text-white">Maha Bandha:</strong> All three locks applied together</li>
             </ul>
           </div>
        </div>

        <!-- Safety Guidelines -->
        <div class="border-l-4 border-red-500/50 bg-red-500/5 p-6 rounded-r-lg mb-8">
           <h3 class="text-red-200 font-bold mb-3 flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
             Critical Safety Guidelines
           </h3>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#B8B8C4]">
             <div>
               <h4 class="text-white font-semibold mb-2">General Precautions</h4>
               <ul class="list-disc list-inside space-y-1 opacity-90">
                 <li>Always practice on an empty stomach (2-5 hours after meals)</li>
                 <li>Sit in a comfortable upright position with straight spine</li>
                 <li>Start slowly and build gradually—never force the breath</li>
                 <li>Discontinue if experiencing dizziness, nausea, or discomfort</li>
               </ul>
             </div>
             <div>
               <h4 class="text-white font-semibold mb-2">Specific Contraindications</h4>
               <ul class="list-disc list-inside space-y-1 opacity-90">
                 <li><strong class="text-red-300">Retention (Kumbhaka):</strong> Avoid if pregnant, heart disease, or hypertension.</li>
                 <li><strong class="text-red-300">Kapalabhati & Bhastrika:</strong> Not for pregnancy, hypertension, epilepsy, hernia, or recent surgery.</li>
                 <li><strong class="text-red-300">Bahya Pranayama:</strong> Avoid during menstruation, pregnancy, heart problems, hernia.</li>
               </ul>
             </div>
           </div>
        </div>
        
        <!-- Breathing Pathways -->
        <div class="bg-gradient-to-r from-blue-900/10 to-transparent p-6 rounded-lg border border-blue-500/10">
           <h3 class="text-blue-200 font-bold mb-3 text-sm uppercase tracking-wider">Breathing Pathway Clarification</h3>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
             <div>
                <h4 class="text-white font-semibold mb-1">Primary Natural Breathing</h4>
                <p class="text-[#B8B8C4]">IN: Nose → Lungs | OUT: Lungs → Nose. <span class="opacity-70">Nose breathing is optimal for filtration, warming, and humidifying air.</span></p>
             </div>
             <div>
                <h4 class="text-white font-semibold mb-1">Nasal Cycle</h4>
                <p class="text-[#B8B8C4]"><span class="text-blue-300">Left (Ida):</span> Cooling, calming. <span class="text-orange-300">Right (Pingala):</span> Warming, energizing. Nostrils alternate dominance every 90-120 mins.</p>
             </div>
           </div>
        </div>

      </section>

      <!-- Call to Action -->
      <section class="text-center py-12">
          <h3 class="text-2xl font-bold text-[#F4F4F8]">Ready for a daily routine?</h3>
          <p class="mt-2 text-[#B8B8C4]">I can create a 7-minute daily metabolism-boost yoga routine for you to follow every morning.</p>
          <button class="mt-6 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform button-primary-gradient focus-ring-accent">
              Generate My 7-Minute Routine
          </button>
      </section>
    </main>

    <footer class="bg-black/20 border-t border-white/5 text-[#6E6E7A] mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm">
        <p>&copy; 2025 Arogya. Practice with compassion.</p>
      </div>
    </footer>
  } @else {
    <app-warm-up (back)="hideWarmUp()" [gender]="selectedGender()"></app-warm-up>
  }
</div>

@if (selectedPose(); as pose) {
  <app-pose-detail-modal 
    [pose]="pose" 
    [gender]="selectedGender()"
    (close)="closeModal()"
    (previous)="goToPreviousPose()"
    (next)="goToNextPose()">
  </app-pose-detail-modal>
}
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PoseDetailModalComponent, WarmUpComponent],
})
export class AppComponent {
  private renderer = inject(Renderer2);
  // FIX: Explicitly type `document` to resolve type inference issue.
  private document: Document = inject(DOCUMENT);

  selectedGender = signal<'female' | 'male'>('female');
  showWarmUpView = signal(false);

  // --- Pranayama Data ---
  // Reordered: Core Essentials first, then Logical Progression
  readonly breathingTechniques = [
    // --- CATEGORY: Core Essentials (Daily Practice) ---
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Diaphragmatic Breathing (Belly Breathing)', 
      ratio: 'Natural', 
      level: 'Beginner', 
      sequence: '<strong>Nose</strong> → <strong>Belly</strong> expands → <strong>Belly</strong> contracts → <strong>Nose</strong>', 
      benefits: 'Foundation practice, activates diaphragm, reduces stress' 
    },
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Ujjayi Breath (Ocean Breath)', 
      ratio: '4:4 or Natural', 
      level: 'Beginner', 
      sequence: '<strong>Nose</strong> → <strong>Throat</strong> constriction → <strong>Lungs</strong> → <strong>Throat</strong> constriction → <strong>Nose</strong>', 
      benefits: 'Builds heat, enhances focus, used in asana practice' 
    },
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Nadi Shodhana (Alternate Nostril)', 
      ratio: '4:4 / 4:4:4', 
      level: 'Beg-Adv', 
      sequence: '<strong>Right Nose</strong> → <strong>Lungs</strong> → <strong>Hold</strong> → <strong>Left Nose</strong> | <strong>Left Nose</strong> → <strong>Lungs</strong> → <strong>Hold</strong> → <strong>Right Nose</strong>', 
      benefits: 'Balances brain hemispheres, clears nadis' 
    },
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Kapalabhati (Skull Shining)', 
      ratio: 'Rapid passive/active', 
      level: 'Advanced', 
      sequence: '<strong>Nose</strong> (passive) → <strong>Belly contracts</strong> (forced) → <strong>Repeat</strong>', 
      benefits: 'Cleanses respiratory system, energizes, clears mind' 
    },
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Bhastrika (Bellows Breath)', 
      ratio: '1:1 rapid', 
      level: 'Advanced', 
      sequence: '<strong>Nose</strong> (Forced In) → <strong>Nose</strong> (Forced Out) → <strong>Equal 1:1 Rhythm</strong>', 
      benefits: 'Generates heat, increases prana, clears nadis' 
    },
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Bhramari (Bee Breath)', 
      ratio: 'Natural', 
      level: 'Intermediate', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> → <strong>Humming vibration</strong> → <strong>Nose</strong>', 
      benefits: 'Calms mind instantly, reduces anxiety and anger' 
    },
    { 
      category: 'Core Essentials (Daily Practice)',
      name: 'Box Breathing (Sama Vritti Kumbhaka)', 
      ratio: '4:4:4:4', 
      level: 'Intermediate', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (4) → <strong>Hold in</strong> (4) → <strong>Nose</strong> (4) → <strong>Hold empty</strong> (4)', 
      benefits: 'Tactical breathing, enhances focus and calm' 
    },

    // --- CATEGORY: The Complete Sequence (Foundational -> Advanced) ---
    
    // Foundational Awareness
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Clavicular Breathing (Upper Chest)', 
      ratio: 'Natural', 
      level: 'Beginner', 
      sequence: '<strong>Nose</strong> → <strong>Upper chest</strong> rises → <strong>Upper chest</strong> falls → <strong>Nose</strong>', 
      benefits: 'Awareness of upper lung breathing, completes full yogic breath' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Three-Part Breath (Dirga)', 
      ratio: 'Natural', 
      level: 'Beginner', 
      sequence: '<strong>Nose</strong> → <strong>Belly</strong> → <strong>Ribs</strong> → <strong>Chest</strong> → <strong>Hold</strong> → <strong>Chest</strong> → <strong>Ribs</strong> → <strong>Belly</strong> → <strong>Nose</strong>', 
      benefits: 'Full lung expansion, complete breath awareness' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Equal (Sama Vritti)', 
      ratio: '4:4', 
      level: 'Beginner', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (4 counts) → <strong>Lungs</strong> → <strong>Nose</strong> (4 counts)', 
      benefits: 'Balances nervous system, calms mind' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Extended Exhale', 
      ratio: '4:6 / 4:8', 
      level: 'Beginner', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (4 counts) → <strong>Lungs</strong> → <strong>Nose</strong> (6-8 counts)', 
      benefits: 'Activates parasympathetic, reduces anxiety' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Coherent Breathing', 
      ratio: '5:5', 
      level: 'Beg-Int', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (5 counts) → <strong>Lungs</strong> → <strong>Nose</strong> (5 counts)', 
      benefits: 'Improves heart rate variability, optimal breathing rate' 
    },
    
    // Balancing & Refinement
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Viloma (Interrupted Breath)', 
      ratio: 'Paused intervals', 
      level: 'Intermediate', 
      sequence: '<strong>Nose</strong> → <strong>Pause</strong> → <strong>Nose</strong> → <strong>Pause</strong> → <strong>Lungs full</strong> → ... → <strong>Empty</strong>', 
      benefits: 'Builds lung capacity, refines breath control' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Ratio Breathing', 
      ratio: '4:6, 5:7', 
      level: 'Intermediate', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (shorter) → <strong>Lungs</strong> → <strong>Nose</strong> (longer)', 
      benefits: 'Customizable nervous system regulation' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Anuloma Viloma', 
      ratio: '4:4 or varies', 
      level: 'Beg-Int', 
      sequence: '<strong>Both Nostrils</strong> → <strong>Lungs</strong> → <strong>Alternate nostril exhale</strong>', 
      benefits: 'Similar to Nadi Shodhana, balances energy channels' 
    },

    // Cooling & Heating (Temperature)
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Sitali (Cooling Breath)', 
      ratio: 'Natural', 
      level: 'Intermediate', 
      sequence: '<strong>Mouth</strong> (rolled tongue) → <strong>Lungs</strong> → <strong>Nose</strong>', 
      benefits: 'Cools body, reduces pitta, calms anger' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Sitkari/Sheetkari (Hissing Breath)', 
      ratio: 'Natural', 
      level: 'Intermediate', 
      sequence: '<strong>Mouth</strong> (clenched teeth) → <strong>Lungs</strong> → <strong>Nose</strong>', 
      benefits: 'Cooling effect, lowers blood pressure, alternative to Sitali' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Chandra Bhedana (Left Nostril)', 
      ratio: '4:4 or 4:8:4', 
      level: 'Int-Adv', 
      sequence: '<strong>Left Nose</strong> → <strong>Lungs</strong> → <strong>Hold</strong> → <strong>Right Nose</strong>', 
      benefits: 'Cools, calms, activates Ida nadi' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Surya Bhedana (Right Nostril)', 
      ratio: '4:4 or 4:8:4', 
      level: 'Int-Adv', 
      sequence: '<strong>Right Nose</strong> → <strong>Lungs</strong> → <strong>Hold</strong> → <strong>Left Nose</strong>', 
      benefits: 'Energizes, increases heat, activates Pingala nadi' 
    },

    // Kriyas & Prep
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Swana Pranayama (Panting Breath)', 
      ratio: 'Rapid', 
      level: 'Intermediate', 
      sequence: '<strong>Mouth</strong> (tongue out) → <strong>Rapid panting</strong> → <strong>Belly movement</strong>', 
      benefits: 'Preparation for Bhastrika and Kapalabhati' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Agnisara/Agnisar Kriya', 
      ratio: 'Bahir Kumbhaka', 
      level: 'Int-Adv', 
      sequence: '<strong>Nose</strong> → <strong>Exhale completely</strong> → <strong>Hold empty</strong> → <strong>Belly pumping</strong> → <strong>Nose</strong>', 
      benefits: 'Stimulates digestive fire, strengthens abdomen, detoxifies' 
    },

    // Advanced Retention & States
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Antar Kumbhaka (Internal Retention)', 
      ratio: '4:2:8 / 4:8:8', 
      level: 'Int-Adv', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (4) → <strong>Hold in</strong> (2-8) → <strong>Nose</strong> (8)', 
      benefits: 'Increases oxygen absorption, builds energy' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Bahya Kumbhaka/Bahya Pranayama', 
      ratio: '4:8:12 (1:2:3)', 
      level: 'Advanced', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (4) → <strong>Nose</strong> (8) → <strong>Hold empty</strong> (12) → <strong>3 Bandhas</strong>', 
      benefits: 'Deep relaxation, digestive health, reproductive system' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Classical Pranayama', 
      ratio: '1:4:2', 
      level: 'Advanced', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (1) → <strong>Hold in</strong> (4) → <strong>Nose</strong> (2)', 
      benefits: 'Traditional intensive practice, expert supervision required' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Murchha Pranayama (Swooning Breath)', 
      ratio: 'Extended retention', 
      level: 'Advanced', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> (full) → <strong>Jalandhar Bandha</strong> → <strong>Hold</strong> → <strong>Nose</strong>', 
      benefits: 'Induces altered consciousness, advanced meditation state' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Plavini Pranayama (Floating Breath)', 
      ratio: 'Extended retention', 
      level: 'Advanced', 
      sequence: '<strong>Nose/Mouth</strong> → <strong>Swallow air</strong> → <strong>Stomach fills</strong> → <strong>Hold</strong> → <strong>Nose/Mouth</strong>', 
      benefits: 'Body lightness, advanced retention, buoyancy' 
    },

    // Spiritual / Mantra
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Udgitha/Udgeeth (OM Chanting)', 
      ratio: 'Natural, extended', 
      level: 'Intermediate', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> → <strong>OM chant</strong> → <strong>Nose/Mouth</strong>', 
      benefits: 'Meditation support, reduces stress, promotes spiritual connection' 
    },
    { 
      category: 'Deepening Practice (The Sequence)',
      name: 'Pranava Pranayama', 
      ratio: 'Natural', 
      level: 'Intermediate', 
      sequence: '<strong>Nose</strong> → <strong>Lungs</strong> → <strong>Mental OM</strong> → <strong>Nose</strong>', 
      benefits: 'Spontaneous breath awareness with mantra, meditative' 
    },
  ];

  readonly poseCategories = signal<PoseCategory[]>([
    {
      id: 'phase1',
      title: 'Phase 1: Warm-Up & Ignition',
      description: 'Standing & Power Poses. Build strength, increase heat, burn calories, and build stamina.',
      poses: [
        { 
          sanskritName: 'Surya Namaskar', 
          englishName: 'Sun Salutation',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'SOOR-yah nah-muhs-KAR-ah',
          benefit: 'Best for metabolism', 
          pranayama: ['Ujjayi', 'Three-Part'],
          mudra: ['Pranamasana (Prayer)'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/foundation/f-surya-namaskar.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/foundation/m-surya-namaskar.jpg?raw=true',
          howToDo: [
            "A sequence of 12 poses flowing from one to the next.",
            "Start in Mountain Pose, flow through poses like Forward Fold, Lunge, Plank, Cobra/Upward Dog, and Downward Dog.",
            "Coordinate each movement with an inhale or an exhale.",
            "The sequence warms up the entire body."
          ],
          frequency: [
            { level: 'Beginner', sets: '1', reps: '3-5 rounds', frequency: 'Once daily' },
            { level: 'Intermediate', sets: '1', reps: '6-8 rounds', frequency: 'Once daily' },
            { level: 'Advanced', sets: '1', reps: '10-12+ rounds', frequency: 'Twice daily' }
          ],
          why: [
            "Metabolism: The best all-around practice for boosting metabolism and warming up the body.",
            "Cardiovascular Health: Provides a good cardiovascular workout.",
            "Full Body Workout: Stretches and strengthens all major muscle groups."
          ]
        },
        { 
          sanskritName: 'Virabhadrasana Series', 
          englishName: 'Warrior Poses',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'veer-ah-bhah-DRAHS-ah-nah',
          benefit: 'Builds strength', 
          pranayama: ['Ujjayi', 'Three-Part'],
          mudra: ['Anjali Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/foundation/f-virabhadrasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/foundation/m-virabhadrasana.jpg?raw=true',
          howToDo: [
            "Step your feet wide apart, about 4 feet.",
            "Turn your right foot out 90 degrees and your left foot in slightly.",
            "Bend your right knee over your right ankle, keeping your back leg straight.",
            "Raise your arms overhead, palms facing each other or together. Gaze forward."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60 secs/side', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Strength: Builds strength in your legs, core, and shoulders.",
            "Stamina: Increases endurance and stamina.",
            "Focus: Develops concentration and confidence."
          ]
        },
        { 
          sanskritName: 'Konasana Series', 
          englishName: 'Angle Poses',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'ko-NAHS-ah-nah',
          benefit: 'Hip Opener', 
          pranayama: ['Diaphragmatic'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/foundation/f-konasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/foundation/m-konasana.jpg?raw=true',
          howToDo: [
            "Sit with your legs straight out in front of you.",
            "Bend your knees and pull your heels towards your pelvis.",
            "Drop your knees out to the sides and press the soles of your feet together.",
            "Hold your feet or ankles. Keep your spine straight."
          ],
          frequency: [
            { level: 'Beginner', duration: '1-2 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '2-4 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '5+ mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Flexibility: Stretches the inner thighs, groins, and knees.",
            "Circulation: Stimulates the heart and improves general circulation.",
            "Reproductive Health: Soothes menstrual discomfort and sciatica."
          ]
        },
      ],
    },
    {
      id: 'phase2',
      title: 'Phase 2: Core & Power Activation',
      description: 'Abdominal Poses. Strengthen digestive fire and support a healthy back.',
      poses: [
        { 
          sanskritName: 'Kumbhakasana', 
          englishName: 'Plank Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'koom-bhah-KAHS-ah-nah',
          benefit: 'Tones core', 
          pranayama: ['Ujjayi', 'Kapalabhati'],
          mudra: ['Hasta Bandha'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/core/f-kumbhakasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/core/m-kumbhakasana.jpg?raw=true',
          howToDo: [
            "Start on your hands and knees.",
            "Step your feet back, one at a time, to bring your body into a straight line from head to heels.",
            "Your hands should be directly under your shoulders.",
            "Engage your core and glutes. Don't let your hips sag or rise."
          ],
          frequency: [
            { level: 'Beginner', duration: '20-30 secs', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45-60 secs', sets: '2-3', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '90+ secs', sets: '3', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Full Body Toning: Tones the entire core, as well as the arms, wrists, and spine.",
            "Metabolism: Builds muscle, which helps to increase resting metabolic rate.",
            "Foundation: A foundational pose for building strength for more advanced postures."
          ]
        },
        { 
          sanskritName: 'Dandasana', 
          englishName: 'Staff Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'dun-DAHS-ah-nah',
          benefit: 'Improves posture', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/core/f-dandasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/core/m-dandasana.jpg?raw=true',
          howToDo: [
            "Sit on the floor with your legs extended straight in front of you.",
            "Sit on your sitting bones, spine erect.",
            "Place your hands on the floor beside your hips, fingers pointing forward.",
            "Flex your feet, engaging your thighs. Tuck your chin slightly."
          ],
          frequency: [
            { level: 'Beginner', duration: '30-60 secs', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '1-2 mins', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '3+ mins', sets: '2', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Posture: Strengthens the back muscles and lengthens the spine.",
            "Alignment: Teaches alignment for other seated poses.",
            "Core: Activates the deep core stabilizers."
          ]
        },

        { 
          sanskritName: 'Navasana', 
          englishName: 'Boat Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'nah-VAHS-ah-nah',
          benefit: 'Strengthens abs', 
          pranayama: ['Ujjayi', 'Bhastrika'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/core/f-navasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/core/m-navasana.jpg?raw=true',
          howToDo: [
            "Sit on the floor with your knees bent.",
            "Lean back slightly and lift your feet off the floor, keeping your shins parallel to the ground (Half Boat).",
            "For Full Boat, straighten your legs to a 45-degree angle.",
            "Extend your arms forward, parallel to the floor. Keep your chest lifted."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-20 secs', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '30-45 secs', sets: '2-3', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60 secs', sets: '3', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Digestive Fire: Tones and strengthens the abdominal muscles, stimulating 'Agni' (digestive fire).",
            "Core Strength: Builds deep core strength, which supports a healthy back.",
            "Balance: Improves balance and focus."
          ]
        },
      ],
    },
    {
      id: 'phase3',
      title: 'Phase 3: Backbends (Energy Surge)',
      description: 'Activate thyroid, adrenal & nervous system. Open the chest for more oxygen and energy.',
      poses: [
        { 
          sanskritName: 'Urdhva Mukha Svanasana', 
          englishName: 'Upward Dog',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'OORD-vah MOO-kah shvahn-AHS-ah-nah',
          benefit: 'Opens chest', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/backbends/f-svanasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/backbends/m-svanasana.jpg?raw=true',
          howToDo: [
            "Lie face down. Place hands alongside your body near your lower ribs.",
            "Inhale and press through your hands, lifting your torso and legs a few inches off the floor.",
            "Engage your leg muscles and keep thighs lifted. Look forward or slightly up.",
            "The tops of your feet and your hands are the only points of contact with the floor."
          ],
          frequency: [
            { level: 'Beginner', duration: '15 seconds', sets: '3-5', reps: '1', frequency: 'In flow' },
            { level: 'Intermediate', duration: '20-25 secs', sets: '3-5', reps: '1', frequency: 'In flow' },
            { level: 'Advanced', duration: '30 seconds', sets: '3-5', reps: '1', frequency: 'In flow' }
          ],
          why: [
            "Posture: Improves posture by strengthening back muscles and opening the chest.",
            "Stimulation: Stimulates abdominal organs and improves digestion.",
            "Mood Lift: Energizes the body and helps alleviate mild depression."
          ]
        },
        { 
          sanskritName: 'Ustrasana', 
          englishName: 'Camel Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'oosh-TRAHS-ah-nah',
          benefit: 'Deep heart opener', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/backbends/f-ustrasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/backbends/m-ustrasana.jpg?raw=true',
          howToDo: [
            "Kneel on the floor with knees hip-width apart.",
            "Press your shins and tops of feet firmly into floor.",
            "Place your hands on your lower back. Inhale, lift your chest.",
            "Exhale, lean back and reach for your heels. Keep your neck neutral or drop back gently."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-20 secs', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '30 secs', sets: '2-3', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '45-60 secs', sets: '3', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Flexibility: Stretches the entire front of the body, ankles, thighs, and groins.",
            "Posture: Improves posture and strengthens back muscles.",
            "Organs: Stimulates the organs of the abdomen and neck (thyroid)."
          ]
        },
        { 
          sanskritName: 'Dhanurasana', 
          englishName: 'Bow Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'dun-yoor-AHS-ah-nah',
          benefit: 'Metabolic booster', 
          pranayama: ['Diaphragmatic'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/backbends/f-dhanurasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/backbends/m-dhanurasana.jpg?raw=true',
          howToDo: [
            "Lie on your stomach. Bend your knees and hold your ankles.",
            "Inhale and lift your chest and thighs off the floor, pulling your ankles.",
            "Look forward, keeping your neck long. Your body should resemble a bow.",
            "Breathe steadily while holding the pose."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-20 secs', sets: '1-2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '25 seconds', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '30 seconds', sets: '2', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Metabolism: Massages the entire digestive tract, boosting metabolism and aiding weight loss.",
            "Flexibility: Stretches the entire front of the body, including the chest, abdomen, and thighs.",
            "Energy: A powerful pose that invigorates and energizes the entire body."
          ]
        },
        { 
          sanskritName: 'Setu Bandha Sarvangasana', 
          englishName: 'Bridge Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'SAY-too BAHN-dhah sar-vahn-GAHS-ah-nah',
          benefit: 'Calms brain', 
          pranayama: ['Ujjayi', 'Diaphragmatic'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/backbends/f-setu-bandha-sarvangasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/backbends/m-setu-bandha-sarvangasana.jpg?raw=true',
          stepsImageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/backbends/f-setu-bandha-sarvangasana-steps.jpg?raw=true',
          stepsImageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/backbends/m-setu-bandha-sarvangasana-steps.jpg?raw=true',
          howToDo: [
            "Lie supine on the floor, knees bent, feet flat hip-width apart.",
            "Arms alongside the body, palms facing down.",
            "Inhale, press into feet and arms, lift your hips towards the ceiling.",
            "Roll your shoulders under and clasp hands below your pelvis. Lift chest to chin."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45-60 secs', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60-90 secs', sets: '3', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Calming: Calms the brain and helps alleviate stress and mild depression.",
            "Stretching: Stretches the chest, neck, and spine.",
            "Therapeutic: Stimulates abdominal organs, lungs, and thyroid."
          ]
        },
        { 
          sanskritName: 'Chakrasana', 
          englishName: 'Wheel Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'chuk-RAHS-ah-nah',
          benefit: 'Energizes body', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/backbends/f-chakrasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/backbends/m-chakrasana.jpg?raw=true',
          howToDo: [
            "Lie on your back with knees bent, feet flat on the floor close to your hips.",
            "Place your hands on the floor by your ears, fingers pointing towards your feet.",
            "Inhale and press into your hands and feet, lifting your hips and then your torso off the floor.",
            "Allow your head to hang gently. Straighten arms and legs as much as possible."
          ],
          frequency: [
            { level: 'Beginner', duration: '3-5 breaths', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '5-8 breaths', sets: '2-3', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '10+ breaths', sets: '3', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Full Body Energy: Opens up the entire body, providing a massive energy boost.",
            "Strength: Builds strength in the legs, arms, spine, and abdomen.",
            "Heart Opener: Stretches the chest and lungs, increasing oxygen intake."
          ]
        },
      ],
    },
    {
      id: 'phase4',
      title: 'Phase 4: Inversions (Brain Nourishment)',
      description: 'Boost Metabolism + Brain Energy. Sharpen the mind, improve blood flow, and activate endocrine glands.',
      poses: [
        { 
          sanskritName: 'Sarvangasana', 
          englishName: 'Shoulder Stand',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'sar-vahn-GAHS-ah-nah',
          benefit: 'Stimulates thyroid', 
          pranayama: ['Ujjayi', 'Diaphragmatic'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/f-sarvangasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/m-sarvangasana.jpg?raw=true',
          stepsImageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/f-sarvangasana-steps.jpg?raw=true',
          stepsImageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/m-sarvangasana-steps.jpg?raw=true',
          howToDo: [
            "Lie on your back with arms alongside your body, palms down.",
            "Inhale and lift your legs, hips, and back off the floor, using your hands to support your lower back.",
            "Raise your legs until they are perpendicular to the floor, keeping your torso straight.",
            "Press your sternum towards your chin. Hold the pose, breathing deeply."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 seconds', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '1 minute', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '2-3 minutes', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Thyroid Health: Stimulates the thyroid and parathyroid glands, regulating metabolism.",
            "Circulation: Improves blood flow to the brain and upper body.",
            "Calming: Soothes the nervous system, reducing stress and anxiety."
          ]
        },
        { 
          sanskritName: 'Halasana', 
          englishName: 'Plow Pose',
          schedule: ['Mon', 'Wed', 'Fri'],
          pronunciation: 'hah-LAHS-ah-nah',
          benefit: 'Boosts digestion', 
          pranayama: ['Ujjayi', 'Diaphragmatic'],
          mudra: ['Interlaced Fingers'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/f-halasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/m-halasana.jpg?raw=true',
          stepsImageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/f-halasana-steps.jpg?raw=true',
          stepsImageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/m-halasana-steps.jpg?raw=true',
          howToDo: [
            "From Shoulder Stand, slowly lower your legs over your head.",
            "Attempt to touch your toes to the floor behind your head.",
            "Keep your back straight and supported with your hands.",
            "You can interlace your fingers on the floor behind your back for a deeper stretch."
          ],
          frequency: [
            { level: 'Beginner', duration: '30-60 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '1-3 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '3-5 mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Digestion: Massages abdominal organs, improving digestion and boosting metabolism.",
            "Spinal Health: Gives a deep stretch to the spine and shoulders.",
            "Calming: Reduces stress and fatigue."
          ]
        },
        { 
          sanskritName: 'Sirsasana', 
          englishName: 'Headstand',
          schedule: ['All'],
          pronunciation: 'sheer-SHAHS-ah-nah',
          benefit: 'Brain oxygen', 
          pranayama: ['Ujjayi', 'Equal'],
          mudra: ['Bound Hands'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/sirsasana.jpg?raw=true',
          imageUrls: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/sirsasana.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/sirsasana-2.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/sirsasana-3.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/sirsasana-4.jpg?raw=true'
          ],
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/sirsasana.jpg?raw=true',
          imageUrlsMale: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/sirsasana.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/sirsasana-2.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/sirsasana-3.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/sirsasana-4.jpg?raw=true'
          ],
          stepsImageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/f-sirsasana-steps.jpg?raw=true',
          stepsImageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/m-sirsasana-steps.jpg?raw=true',
          handImageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/f-sirsasana-hand.jpg?raw=true',
          handImageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/m-sirsasana-hand.jpg?raw=true',
          howToDo: [
            "Kneel on the floor and interlock your fingers to create a cup with your hands.",
            "Place your forearms and the crown of your head on the floor, cupping the back of your head with your hands.",
            "Lift your knees off the floor and walk your feet closer to your head.",
            "Slowly lift your feet off the floor, one at a time or together, and extend your legs upwards.",
            "Keep your core engaged and body in a straight line."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '1-2 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '3-5 mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Brain & Nervous System: Increases blood flow to the brain, enhancing focus, memory, and mental clarity. Reduces stress & anxiety.",
            "Hormones & Energy: Stimulates pituitary and pineal glands, improving energy levels, mood, and metabolism.",
            "Strength: Builds strength in the core, shoulders, and arms."
          ]
        },
        { 
          sanskritName: 'Pincha Mayurasana', 
          englishName: 'Feathered Peacock',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'PEEN-chah mah-yoor-AHS-ah-nah',
          benefit: 'Shoulder strength', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/f-pincha.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/m-pincha.jpg?raw=true',
          stepsImageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/f-pincha-steps.jpg?raw=true',
          stepsImageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/m-pincha-steps.jpg?raw=true',
          imageUrls: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/f-pincha-warmup1.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/inversions/f-pincha-warmup2.jpg?raw=true'
          ],
          imageUrlsMale: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/m-pincha-warmup1.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/inversions/m-pincha-warmup2.jpg?raw=true'
          ],
          howToDo: [
            "Start on hands and knees. Place forearms on the floor, parallel to each other, shoulder-width apart.",
            "Tuck toes and lift hips high into Dolphin Pose.",
            "Walk feet in closer to elbows as much as possible, keeping the spine long.",
            "Lift one leg high towards the ceiling. Gently hop off the standing foot to bring both legs overhead.",
            "Squeeze legs together, engage core, and press down firmly through forearms. Gaze slightly forward."
          ],
          frequency: [
            { level: 'Beginner', duration: 'Dolphin 60s', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: 'Kick-up reps', sets: '10', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: 'Hold 60 secs', sets: '2-3', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Upper Body Strength: Builds tremendous strength in the shoulders, arms, and upper back.",
            "Balance & Focus: Requires and develops deep concentration and balance.",
            "Energy: Inversions increase blood flow to the brain, energizing the mind and relieving stress."
          ]
        },
        { 
          sanskritName: 'Viparita Karani', 
          englishName: 'Legs-Up-the-Wall',
          schedule: ['Sun'],
          pronunciation: 'vip-par-ee-tah kar-AHN-ee',
          benefit: 'Restores energy', 
          pranayama: ['Equal', 'Diaphragmatic'],
          mudra: ['Chin Mudra'],
          imageUrl: 'https://www.rishikulyogshalarishikesh.com/blog/wp-content/uploads/2024/09/Legs-Up-the-Wall-Pose-1024x958.jpg',
          howToDo: [
            "Sit with your side against a wall.",
            "Gently swing your legs up the wall as you lie down on your back.",
            "Adjust your position so your sitting bones are as close to the wall as comfortable.",
            "Relax your arms out to the sides, palms up. Breathe deeply."
          ],
          frequency: [
            { level: 'Beginner', duration: '5 minutes', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '10 minutes', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '15 minutes', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Restoration: Calms the nervous system, reduces fatigue and restores energy.",
            "Circulation: Alleviates swollen ankles and feet by reversing blood flow.",
            "Stress Relief: Excellent for reducing anxiety and promoting relaxation."
          ]
        },
      ],
    },
     {
      id: 'phase5',
      title: 'Phase 5: Twists (Neutralize & Detox)',
      description: 'Improve digestion + detox. Massages the digestive organs for better metabolism.',
      poses: [
        { 
          sanskritName: 'Ardha Matsyendrasana', 
          englishName: 'Half Lord of the Fishes',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'maht-syen-DRAHS-ah-nah',
          benefit: 'Stimulates liver', 
          pranayama: ['Diaphragmatic'],
          mudra: ['Abhaya Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/twists/f-matsyendrasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/twists/m-matsyendrasana.jpg?raw=true',
          howToDo: [
            "Sit with legs extended. Bend your right knee and place the foot outside your left thigh.",
            "Bend your left knee and bring the foot near your right hip.",
            "Inhale and lengthen your spine. Exhale and twist towards the right.",
            "Place your right hand on the floor behind you and bring your left elbow to the outside of your right knee."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60 secs/side', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Detoxification: Massages abdominal organs like the liver and kidneys, aiding in detox.",
            "Digestion: Improves digestive function and relieves constipation.",
            "Spinal Mobility: Increases the flexibility of the spine."
          ]
        },
        { 
          sanskritName: 'Supta Matsyendrasana', 
          englishName: 'Supine Spinal Twist',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'SOOP-tah maht-syen-DRAHS-ah-nah',
          benefit: 'Releases lower back', 
          pranayama: ['Diaphragmatic'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/twists/f-supta-matsyendrasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/twists/m-supta-matsyendrasana.jpg?raw=true',
          howToDo: [
            "Lie on your back. Hug your right knee into your chest.",
            "Drop your right knee over to the left side of your body.",
            "Extend your right arm out to the side and gaze to the right.",
            "Keep both shoulders flat on the floor."
          ],
          frequency: [
            { level: 'Beginner', duration: '30-60 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '1-2 mins/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '3+ mins/side', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Spine Health: Realigns the spine and hydrates the spinal discs.",
            "Digestion: Massages the abdominal organs.",
            "Relaxation: Relieves tension in the lower back and hips."
          ]
        },
        { 
          sanskritName: 'Jathara Parivartanasana A', 
          englishName: 'Revolved Abdomen Pose A',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'jut-HUH-rah puh-ree-vahr-tah-NAHS-ah-nah',
          benefit: 'Tones abdomen', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/twists/f-jathara-parivartanasana-a.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/twists/m-jathara-parivartanasana-a.jpg?raw=true',
          howToDo: [
            "Lie on your back with arms extended to the sides.",
            "Lift your legs straight up to 90 degrees.",
            "Exhale and lower both legs to the right, keeping them straight.",
            "Try to touch your feet to your right hand. Keep left shoulder down."
          ],
          frequency: [
            { level: 'Beginner', duration: 'Knees bent', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: 'Legs straight', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: 'Hold 1 min', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Core: Strengthens the oblique muscles.",
            "Detox: Wrings out the abdominal organs.",
            "Spine: Rotates and releases the lower spine."
          ]
        },
        { 
          sanskritName: 'Jathara Parivartanasana B', 
          englishName: 'Revolved Abdomen Pose B',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'jut-HUH-rah puh-ree-vahr-tah-NAHS-ah-nah',
          benefit: 'Deep twist', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/twists/f-jathara-parivartanasana-b.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/twists/m-jathara-parivartanasana-b.jpg?raw=true',
          howToDo: [
            "Similar to variation A, but usually done with knees bent (dynamic) or holding the toes.",
            "Focus on keeping the shoulders grounded as the legs rotate.",
            "Engage the core to control the movement."
          ],
          frequency: [
            { level: 'Beginner', duration: 'Dynamic', sets: '5', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: 'Hold', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: 'Deep hold', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Mobility: Increases rotational flexibility of the spine.",
            "Digestion: Stimulates peristalsis.",
            "Energy: Removes blockages in the energy channels."
          ]
        },
        { 
          sanskritName: 'Bharadvajasana', 
          englishName: 'Seated Twist',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'bhah-rahd-vah-JAHS-ah-nah',
          benefit: 'Improves digestion', 
          pranayama: ['Diaphragmatic'],
          mudra: ['Chin Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/twists/f-bharadvajasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/twists/m-bharadvajasana.jpg?raw=true',
          howToDo: [
            "Sit on the floor with legs straight out.",
            "Shift your weight onto your right buttock, bend your knees, and swing your legs to the left.",
            "Inhale to lengthen your spine. Exhale and twist your torso to the right.",
            "Place your right hand on the floor behind you and your left hand on your right thigh."
          ],
          frequency: [
            { level: 'Beginner', duration: '30 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '45 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60 secs/side', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Organ Health: Stimulates the digestive organs and improves metabolism.",
            "Pain Relief: Can relieve lower backache, neck pain, and sciatica.",
            "Flexibility: Stretches the spine, shoulders, and hips."
          ]
        },
      ],
    },
    {
      id: 'phase6',
      title: 'Phase 6: Balance & Integration',
      description: 'Stabilize the body and mind. Cultivate focus, coordination, and inner equilibrium.',
      poses: [
        {
          sanskritName: 'Utthita Hasta Padangusthasana',
          englishName: 'Extended Hand-to-Big-Toe Pose',
          schedule: ['Tue', 'Thu', 'Sat', 'S4'],
          pronunciation: 'oot-TEE-tah HA-stah pah-dahn-goosh-TAHS-ah-nah',
          benefit: 'Leg stretch & balance',
          pranayama: ['Ujjayi', 'Equal'],
          mudra: ['Vishnu Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/balances/f-utthita-hasta-padangusthasana-1.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/balances/m-utthita-hasta-padangusthasana-1.jpg?raw=true',
          imageUrls: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/balances/f-utthita-hasta-padangusthasana-1.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/balances/f-utthita-hasta-padangusthasana-2.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/balances/f-utthita-hasta-padangusthasana-3.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/balances/f-utthita-hasta-padangusthasana-4.jpg?raw=true'
          ],
          imageUrlsMale: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/balances/m-utthita-hasta-padangusthasana-1.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/balances/m-utthita-hasta-padangusthasana-2.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/balances/m-utthita-hasta-padangusthasana-3.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/balances/m-utthita-hasta-padangusthasana-4.jpg?raw=true'
          ],
          howToDo: [
            "Stand in Mountain Pose. Shift weight to left foot.",
            "Lift right knee. Hook index and middle finger around big toe.",
            "Extend leg forward. Keep spine straight and shoulders down.",
            "If stable, open leg to the side. Gaze over left shoulder."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-30 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '30-45 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60+ secs', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Flexibility: Deeply stretches hamstrings and hips.",
            "Balance: Improves physical stability and mental focus.",
            "Strength: Strengthens legs and ankles."
          ]
        },
        {
          sanskritName: 'Skandasana',
          englishName: 'Side Lunge',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'skahn-DAHS-ah-nah',
          benefit: 'Hip & Hamstring Opener',
          pranayama: ['Ujjayi'],
          mudra: ['Anjali Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/balances/f-skandasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/balances/m-skandasana.jpg?raw=true',
          howToDo: [
            "Start in a wide-legged standing position.",
            "Bend your right knee deeply, keeping left leg straight.",
            "Lower hips towards right heel. Keep left foot flexed, toes pointing up.",
            "Hands can be on floor for support or in prayer at heart center."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-30 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '30-45 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60+ secs/side', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Flexibility: Opens hips and stretches inner thighs and hamstrings.",
            "Balance: Improves balance and core stability.",
            "Strength: Strengthens legs and glutes."
          ]
        },
        {
          sanskritName: 'Natarajasana',
          englishName: 'Dancer Pose',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'not-ah-rah-JAHS-ah-nah',
          benefit: 'Grace & Balance',
          pranayama: ['Ujjayi'],
          mudra: ['Jnana Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/balances/f-natarajasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/balances/m-natarajasana.jpg?raw=true',
          howToDo: [
            "Stand in Mountain Pose. Shift weight to left foot.",
            "Bend right knee back, grasp inside of right foot with right hand.",
            "Reach left arm forward and up. Kick right foot into hand to lift leg.",
            "Lean torso forward slightly. Gaze at a fixed point."
          ],
          frequency: [
            { level: 'Beginner', duration: '15-30 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '30-45 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '60+ secs', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Balance: Develops poise and concentration.",
            "Flexibility: Stretches shoulders, chest, thighs, and abdomen.",
            "Strength: Strengthens legs and ankles."
          ]
        },
        {
          sanskritName: 'Bakasana',
          englishName: 'Crow Pose',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'bah-KAHS-ah-nah',
          benefit: 'Arm Balance',
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/balances/f-bakasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/balances/m-bakasana.jpg?raw=true',
          howToDo: [
            "Squat down, feet together, knees apart.",
            "Place hands on floor shoulder-width apart.",
            "Lift hips high. Place knees on upper arms/triceps.",
            "Shift weight forward onto hands. Lift feet off floor one by one."
          ],
          frequency: [
            { level: 'Beginner', duration: 'Hold 5-10 secs', sets: '3', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: 'Hold 20-30 secs', sets: '3', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: 'Hold 60 secs', sets: '2', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Strength: Builds arm, shoulder, and core strength.",
            "Balance: Improves coordination and balance.",
            "Focus: Requires deep concentration."
          ]
        },
        {
          sanskritName: 'Astavakrasana',
          englishName: 'Eight-Angle Pose',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'ush-tah-vah-KRAHS-ah-nah',
          benefit: 'Advanced Arm Balance',
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/balances/f-astavakrasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/balances/m-astavakrasana.jpg?raw=true',
          howToDo: [
            "Sit with legs extended. Bend right knee, bring leg over right shoulder.",
            "Place hands on floor. Hook left ankle over right ankle.",
            "Lean forward, bend elbows to 90 degrees.",
            "Lift hips and extend legs to the side."
          ],
          frequency: [
            { level: 'Beginner', duration: 'Attempt lift', sets: '3', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: 'Hold 10-20 secs', sets: '2', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: 'Hold 30+ secs', sets: '2', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Strength: Strengthens wrists, arms, and shoulders.",
            "Core: Tones abdominal muscles.",
            "Digestion: Compresses abdominal organs, aiding digestion."
          ]
        }
      ]
    },
    {
      id: 'phase7',
      title: 'Phase 7: Forward Bends (Cool Down)',
      description: 'Calm the nervous system. Lengthen the spine and hamstrings to wind down.',
      poses: [
        { 
          sanskritName: 'Paschimottanasana', 
          englishName: 'Seated Forward Bend',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'pash-chee-moh-tahn-AHS-ah-nah',
          benefit: 'Calms the brain', 
          pranayama: ['Ujjayi', 'Extended Exhale'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/forward-bends/f-paschimottanasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/forward-bends/m-paschimottanasana.jpg?raw=true',
          howToDo: [
            "Sit with legs extended straight in front of you.",
            "Inhale and reach your arms up, lengthening the spine.",
            "Exhale and hinge at your hips to fold forward over your legs.",
            "Reach for your feet or shins. Keep the spine long, neck relaxed."
          ],
          frequency: [
            { level: 'Beginner', duration: '30-60 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '1-2 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '3-5 mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Calming: Soothes the nervous system and relieves mild depression and anxiety.",
            "Flexibility: deeply stretches the entire back of the body, from heels to head.",
            "Digestion: Compresses the abdomen, stimulating digestive organs."
          ]
        },
        { 
          sanskritName: 'Janu Sirsasana', 
          englishName: 'Head-to-Knee Pose',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'JAH-noo sheer-SHAHS-ah-nah',
          benefit: 'Calms mind', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/forward-bends/f-janu-sirsasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/forward-bends/m-janu-sirsasana.jpg?raw=true',
          howToDo: [
            "Sit with legs extended. Bend right knee, place foot against inner left thigh.",
            "Inhale, lengthen spine. Exhale, fold forward over left leg.",
            "Hold foot or shin. Keep spine long.",
            "Repeat on the other side."
          ],
          frequency: [
            { level: 'Beginner', duration: '30-60 secs/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '1-2 mins/side', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '3+ mins/side', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Liver & Kidneys: Stimulates the liver and kidneys.",
            "Calming: Calms the brain and helps relieve mild depression.",
            "Stretching: Stretches the spine, shoulders, hamstrings, and groins."
          ]
        },
        { 
          sanskritName: 'Kurmasana', 
          englishName: 'Tortoise Pose',
          schedule: ['Tue', 'Thu', 'Sat'],
          pronunciation: 'koor-MAHS-ah-nah',
          benefit: 'Withdraws senses', 
          pranayama: ['Ujjayi'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/forward-bends/f-kurmasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/forward-bends/m-kurmasana.jpg?raw=true',
          howToDo: [
            "Sit with legs wide apart. Bend knees slightly.",
            "Slide arms under knees, palms down.",
            "Lean forward, extending legs and arms.",
            "Bring chest and chin to the floor."
          ],
          frequency: [
            { level: 'Beginner', duration: 'Attempt', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '30-60 secs', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '1-3 mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Pratyahara: Encourages withdrawal of the senses (Pratyahara).",
            "Flexibility: Intense stretch for hips and back.",
            "Calming: Soothes the nerves."
          ]
        }
      ]
    },
    {
      id: 'phase8',
      title: 'Phase 8: Dhyana Asanas (Meditative Poses)',
      description: 'Cultivate mental stability and deep peace. Perfect for meditation and integrating your practice.',
      poses: [
        { 
          subCategory: 'Meditative Asanas',
          sanskritName: 'Vajrasana', 
          englishName: 'Thunderbolt Pose',
          schedule: ['Mon', 'Thu'],
          pronunciation: 'vuj-RAHS-ah-nah',
          benefit: 'Aids digestion', 
          pranayama: ['Diaphragmatic'],
          mudra: ['Chin Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-vajrasana-main.jpg?raw=true',
          imageUrls: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-vajrasana-main.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-vajrasana-rear.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-vajrasana.jpg?raw=true'
          ],
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-vajrasana-main.jpg?raw=true',
          imageUrlsMale: [
             'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-vajrasana-main.jpg?raw=true',
             'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-vajrasana-rear.jpg?raw=true',
             'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-vajrasana.jpg?raw=true'
          ],
          howToDo: [
            "Kneel on the floor with knees close together.",
            "Sit back on your heels, keeping your spine straight.",
            "Place your hands on your knees, palms facing down.",
            "Keep your head straight and gaze forward."
          ],
          frequency: [
            { level: 'Beginner', duration: '2-5 mins', sets: '1', reps: '1', frequency: 'After meals' },
            { level: 'Intermediate', duration: '5-10 mins', sets: '1', reps: '1', frequency: 'After meals' },
            { level: 'Advanced', duration: '15+ mins', sets: '1', reps: '1', frequency: 'After meals' }
          ],
          why: [
            "Digestion: One of the few poses recommended immediately after eating to aid digestion.",
            "Stability: Provides a solid foundation for pranayama and meditation.",
            "Joint Health: Increases flexibility in the ankles and knees."
          ]
        },
        { 
          subCategory: 'Meditative Asanas',
          sanskritName: 'Padmasana', 
          englishName: 'Lotus Pose',
          schedule: ['Tue', 'Fri'],
          pronunciation: 'pud-MAHS-ah-nah',
          benefit: 'Deep stability', 
          pranayama: ['Nadi Shodhana', 'Ujjayi'],
          mudra: ['Chin Mudra', 'Bhairava'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-padmasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-padmasana.jpg?raw=true',
          howToDo: [
            "Sit with legs extended. Bend the right knee and place the foot on the left thigh, heel close to the abdomen.",
            "Bend the left knee and place the foot on the right thigh, heel close to the abdomen.",
            "Keep the spine straight and shoulders relaxed.",
            "Place hands in a mudra on the knees."
          ],
          frequency: [
            { level: 'Beginner', duration: 'Avoid if painful', sets: '0', reps: '0', frequency: 'Caution' },
            { level: 'Intermediate', duration: '1-3 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '10+ mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Stability: The crossed legs create a solid base that holds the spine straight effortlessly.",
            "Focus: Locks the body in place, minimizing distraction and promoting deep concentration.",
            "Energy: Retains vital energy within the body."
          ]
        },
        { 
          subCategory: 'Meditative Asanas',
          sanskritName: 'Bhadrasana', 
          englishName: 'Gracious Pose',
          schedule: ['Wed', 'Sat'],
          pronunciation: 'bhuh-DRAHS-ah-nah',
          benefit: 'Root chakra', 
          pranayama: ['Ujjayi'],
          mudra: ['Nasikagra Drishti'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-bhadrasana-main.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-bhadrasana-main.jpg?raw=true',
          howToDo: [
            "Sit in Vajrasana (kneeling). Separate your knees as wide as possible.",
            "Keep the toes in contact with each other behind you, allowing the buttocks to rest on the floor between the feet.",
            "Place hands on knees, keep spine straight.",
            "Gaze at the nose tip or close eyes."
          ],
          frequency: [
            { level: 'Beginner', duration: '1-2 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '3-5 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '10+ mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Hip Opener: Deeply opens the hips and pelvic region.",
            "Root Chakra: Stimulates the Mooladhara chakra.",
            "Digestion: beneficial for stomach ailments."
          ]
        },
        { 
          subCategory: 'Meditative Asanas',
          sanskritName: 'Siddhasana', 
          englishName: 'Perfect Pose',
          schedule: ['All'],
          pronunciation: 'sid-DHAHS-ah-nah',
          benefit: 'Purifies energy', 
          pranayama: ['Kapalabhati', 'Bhastrika'],
          mudra: ['Chin Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-siddhasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-siddhasana.jpg?raw=true',
          howToDo: [
            "Sit with legs extended. Bend the left knee and place the heel near the perineum.",
            "Bend the right knee and place the right heel against the pubic bone, directly above the left heel.",
            "Tuck the toes of the right foot between the calf and thigh muscles of the left leg.",
            "Keep spine erect, hands in chin mudra on knees."
          ],
          frequency: [
            { level: 'Beginner', duration: '1-3 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '5-10 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '15-30+ mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Energy Control: Directs energy upwards to the higher chakras.",
            "Nervous System: Calms the nervous system and balances the mind.",
            "Flexibility: Increases flexibility in hips and knees."
          ]
        },
        { 
          subCategory: 'Meditative Asanas',
          sanskritName: 'Bhramari', 
          englishName: 'Bee Breath',
          schedule: ['All'],
          pronunciation: 'bhrah-mah-REE',
          benefit: 'Soothes mind', 
          pranayama: ['Bhramari'],
          mudra: ['Shanmukhi Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-bhramari.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-bhramari.jpg?raw=true',
          howToDo: [
            "Sit comfortably with eyes closed.",
            "Place your index fingers on your ears (on the tragus cartilage).",
            "Inhale deeply through the nose.",
            "Exhale slowly while making a deep, steady humming sound like a bee.",
            "Feel the vibration resonate in the head."
          ],
          frequency: [
            { level: 'Beginner', sets: '1 round', reps: '5-10 breaths', frequency: 'As needed' },
            { level: 'Intermediate', sets: '1 round', reps: '10-20 breaths', frequency: 'As needed' },
            { level: 'Advanced', sets: '1 round', reps: '20+ breaths', frequency: 'As needed' }
          ],
          why: [
            "Anxiety Relief: Instantly calms the mind and reduces anger or anxiety.",
            "Insomnia: Helps induce deep sleep.",
            "Focus: Improves concentration and memory."
          ]
        },
        { 
          subCategory: 'Meditative Asanas',
          sanskritName: 'Sukhasana', 
          englishName: 'Easy Pose',
          // Schedule removed as requested
          pronunciation: 'soo-KAHS-ah-nah',
          benefit: 'Meditation base', 
          pranayama: ['Nadi Shodhana', 'Equal'],
          mudra: ['Chin Mudra', 'Gyan Mudra'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-sukhasana-main.jpg?raw=true',
          imageUrls: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-sukhasana-main.jpg?raw=true',
            'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-sukhasana.jpg?raw=true'
          ],
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-sukhasana-main.jpg?raw=true',
          imageUrlsMale: [
            'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-sukhasana-main.jpg?raw=true',
             'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-sukhasana.jpg?raw=true'
          ],
          howToDo: [
            "Sit on the floor or a cushion with your legs crossed.",
            "Place each foot beneath the opposite knee.",
            "Keep your spine straight, head aligned with your neck.",
            "Rest your hands on your knees, palms up or down. Close your eyes and breathe."
          ],
          frequency: [
            { level: 'Beginner', duration: '1-5 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Intermediate', duration: '5-15 mins', sets: '1', reps: '1', frequency: 'Daily' },
            { level: 'Advanced', duration: '20+ mins', sets: '1', reps: '1', frequency: 'Daily' }
          ],
          why: [
            "Mental Calm: A stable posture that centers the mind and reduces stress.",
            "Posture: Strengthens the back and improves body alignment.",
            "Meditation: The classic comfortable seat for breathwork and mindfulness."
          ]
        },
        { 
          subCategory: 'Relaxation Asanas',
          sanskritName: 'Savasana', 
          englishName: 'Corpse Pose',
          schedule: ['All'],
          pronunciation: 'shuh-VAHS-ah-nah',
          benefit: 'Deep relaxation', 
          pranayama: ['Diaphragmatic', 'Coherent'],
          mudra: ['None'],
          imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/meditation/f-savasana.jpg?raw=true',
          imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/meditation/m-savasana.jpg?raw=true',
          howToDo: [
            "Lie flat on your back, legs extended and feet falling open.",
            "Arms rest alongside the body, palms facing up.",
            "Close your eyes and release all muscular tension.",
            "Remain completely still for 5-10 minutes, allowing the benefits of practice to integrate."
          ],
          frequency: [
            { level: 'Beginner', duration: '5 mins', sets: '1', reps: '1', frequency: 'End of practice' },
            { level: 'Intermediate', duration: '10 mins', sets: '1', reps: '1', frequency: 'End of practice' },
            { level: 'Advanced', duration: '15+ mins', sets: '1', reps: '1', frequency: 'End of practice' }
          ],
          why: [
            "Integration: Allows the body to absorb the benefits of the yoga practice.",
            "Stress Reduction: Triggers the parasympathetic nervous system (rest and digest).",
            "Rejuvenation: Completely relaxes the body and mind, reducing fatigue."
          ]
        }
      ],
    },
  ]);

  readonly allPoses = computed(() => this.poseCategories().flatMap(c => c.poses));
  
  selectedPoseIndex = signal<number | null>(null);

  readonly selectedPose = computed(() => {
    const index = this.selectedPoseIndex();
    const poses = this.allPoses();
    if (index === null || index < 0 || index >= poses.length) {
      return null;
    }
    return poses[index];
  });


  readonly topPoses = signal<Pose[]>(this.poseCategories().flatMap(c => c.poses).filter(p => [
      'Sarvangasana', 'Surya Namaskar', 'Navasana', 'Kapalbhati', 'Dhanurasana', 'Bhramari'
    ].includes(p.sanskritName)));

  constructor() {
    effect(() => {
      const gender = this.selectedGender();
      if (gender === 'male') {
        this.renderer.addClass(this.document.body, 'male-theme');
      } else {
        this.renderer.removeClass(this.document.body, 'male-theme');
      }
    });
  }

  setGender(gender: 'female' | 'male') {
    this.selectedGender.set(gender);
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openModal(pose: Pose) {
    const index = this.allPoses().findIndex(p => p.sanskritName === pose.sanskritName);
    if (index !== -1) {
      this.selectedPoseIndex.set(index);
    }
  }

  closeModal() {
    this.selectedPoseIndex.set(null);
  }

  goToNextPose() {
    const currentIndex = this.selectedPoseIndex();
    if (currentIndex !== null) {
      const totalPoses = this.allPoses().length;
      const nextIndex = (currentIndex + 1) % totalPoses;
      this.selectedPoseIndex.set(nextIndex);
    }
  }

  goToPreviousPose() {
    const currentIndex = this.selectedPoseIndex();
    if (currentIndex !== null) {
      const totalPoses = this.allPoses().length;
      const prevIndex = (currentIndex - 1 + totalPoses) % totalPoses;
      this.selectedPoseIndex.set(prevIndex);
    }
  }

  showWarmUp() {
    this.showWarmUpView.set(true);
    window.scrollTo(0, 0);
  }

  hideWarmUp() {
    this.showWarmUpView.set(false);
    window.scrollTo(0, 0);
  }

  getScheduleDisplay(schedule: string[] | undefined): string {
    if (!schedule || schedule.length === 0) return '';
    
    // Filter out step indicators (starting with 'S' followed by a number)
    const days = schedule.filter(item => !/^S\d+$/.test(item));

    if (days.length === 0) return '';

    // Handle "All" case specifically
    if (days.includes('All')) return 'Daily';

    return days.map(day => {
      switch(day) {
        case 'Mon': return 'M';
        case 'Tue': return 'Tu';
        case 'Wed': return 'W';
        case 'Thu': return 'Th';
        case 'Fri': return 'F';
        case 'Sat': return 'Sa';
        case 'Sun': return 'Su';
        default: return day;
      }
    }).join(' - ');
  }

  getStepValue(schedule: string[] | undefined): string | null {
    if (!schedule) return null;
    const step = schedule.find(item => /^S\d+$/.test(item));
    return step || null;
  }
}