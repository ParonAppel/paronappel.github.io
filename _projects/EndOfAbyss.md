---
title: End of Abyss
year: 2026
stack: [UE5, C++, Blueprints, Materials]
summary: My work on the game End of Abyss
layout: portfoliopage
icon: /assets/projectstuff/EndOfAbyss/Icon_EndOfAbyss.png
stylesheet: /assets/css/endOfAbyss.css
toc: true

video: https://www.youtube.com/watch?v=mTue29WoYHc
platform: PC, PS5 & Xbox Series X|S
role: Programming & UI
engine: Unreal Engine 5.3 - 5.8
languages: C++, Blueprints
duration: From nov 2023 to current
link: https://store.playstation.com/sv-se/product/HP1597-PPSA25717_00-ENDOFABYSS000000
link_text: To Store Page

---

# Overview
{: .no_toc }

**End of Abyss** is a twin-stick shooter metroidvania, with a sci-fi horror theme to it. It was released on **October 1th 2026**.

I joined the project as an intern in November 2023 when the game was still in pre-alpha. During my time at the company, both as intern and employee, I have gotten to work with an incredible small team all the way to release and beyond.

My responsiblities during the project has mainly been implementing the UI and working on systems that the UI depends upon, such as the scanning/map icon system. But as one of the 2-3 programmers we have been on this project I have also had to work on quite a few different things. So bear with me and the heap of text when I go through some of the highligts of 3+ years of work.

**Continue to read below for a deeper dive!**

---

<br/>

# The Map
<br/>

---

# UI Materials

<figure class="float-right">
  <a href="/assets/projectstuff/EndOfAbyss/CRT-web.mp4" target="_blank" rel="noopener noreferrer">
    <video class="bracket" muted loop playsinline autoplay preload="metadata">
        <source src="/assets/projectstuff/EndOfAbyss/CRT-web.mp4" type="video/mp4">
    </video>
  </a>
  <figcaption>CRT effect in the map menu. [click to see in full]</figcaption>
</figure>

One of my favourite things to work on is UI materials and in this project I have gotten the chance to improve my material-making skills quite a lot. Materials have been quite a central part in bringing our concepts to life. Everything from simple radial progression bars to the main CRT-like overlay has helped in giving the games UI the feeling we were striving for.

<br/>

<details markdown="1">
<summary>A deep-dive into the pager material</summary>

<video class="bracket" muted loop playsinline autoplay preload="metadata">
  <source src="/assets/projectstuff/EndOfAbyss/Pager-web.mp4" type="video/mp4">
</video>

The pager material was an interesting challenge since it was made near the end of the project with a lot of **time constraints**. It also needed me to **sync it to the audio** that is being played when the NPCs are calling, something I hadn't done before.

<br/>

## The Setup
{: .no_toc }

<figure class="float-right">
    <a href="/assets/projectstuff/EndOfAbyss/AudioVisualiserSetup2.png" target="_blank" rel="noopener noreferrer">
        <img class="bracket" preload="metadata" src="/assets/projectstuff/EndOfAbyss/AudioVisualiserSetup2.png">
    </a>
    <figcaption> Blueprint setup</figcaption>
</figure>

<figure class="float-right">
    <a href="/assets/projectstuff/EndOfAbyss/BandSetup.png" target="_blank" rel="noopener noreferrer">
        <img class="bracket" preload="metadata" src="/assets/projectstuff/EndOfAbyss/BandSetup.png">
     </a>
    <figcaption> Band 1 in material </figcaption>
</figure>

<figure class="float-right">
    <img class="bracket" preload="metadata" src="/assets/projectstuff/EndOfAbyss/BandOutput.png">
  <figcaption> Band 1's output / All band outputs </figcaption>
</figure>


To start of we of course had to tie it to the actual played audio, this I got help with from our audio guy, Lilja. So whilst he fixed the setup with the submixes and audio-related things I made sure to connect it to the material.

The next thing was to tie the respective frequency values to their "band"/column, but something I realized quite quickly is that it didn't look quite right with just 12 proper bands. So my solution was to insert an extra column with a lerped fake value in between each actual value creating the illusion of reading more frequencies than we are.

There is also a sine wave offset that is based on the overall amplitude of the entire audio, this gives more movement and life to the material.

The band setup you see in the pic is just for "Band 1" and has been copy-pasted for the other 12 frequency reads. I am not super happy with this setup and would've hoped it could've been more automated. Due to the time constraints this was the solution I ended up with since I felt like I couldn't spend time researching a better way of setting up the multiple bands.

The bands are then maxed together to create the full output.

**At this point we have a fully functioning audio visualiser, but it isn't very appealing to look at**

<br/>

## The Cosmetic Side
{: .no_toc }

<figure class="float-right">
    <img class="bracket" preload="metadata" src="/assets/projectstuff/EndOfAbyss/DottedPattern.png">
  <figcaption> Dotted Pattern / Smooth-step effect </figcaption>
</figure>



At this point it is time to **spruce up** the material. I was working after a reference video, unfortunately I don't have the reference available.

The first order of buisness was to create a sort of dithered/cell-like effect. This was achived by creating rows and columns that was later multiplied together to create a dotted pattern.

When combining this pattern with the previous output from all the frequency bands in a smooth-step node it creates a tapered pattern.

<figure class="float-right">
    <img class="bracket" preload="metadata" src="/assets/projectstuff/EndOfAbyss/NoisePattern.png">
  <figcaption> Noise Pattern / Combined with volume </figcaption>
</figure>

<figure class="float-right">
    <img class="bracket" preload="metadata" src="/assets/projectstuff/EndOfAbyss/FinalResult.png">
  <figcaption> FinalOutput </figcaption>
</figure>


This already looks good, but the reference video had a bit more noise and randomness in it. So to achieve that I used the dotted pattern from before but instead combined it with a randomly genereated noise. The noise was created with half the amount of rows to create a broken effect on some of the dots. Combining this with the amplitude and frequency bands make the noise show up more when the volume is stronger.

The frequency values are then added back in to create the final result.


<figure>
    <a href="/assets/projectstuff/EndOfAbyss/FinalOutput2.png" target="_blank" rel="noopener noreferrer">
        <img class="bracket" preload="metadata" src="/assets/projectstuff/EndOfAbyss/FinalOutput2.png">
    </a>
    <figcaption> Final combination of everything in graph </figcaption>
</figure>


</details>

---


<br/>

# Custom slate widgets

## Controller hint

<figure class="float-right twentyWidth">
    <img class="bracket" preload="metadata" src="/assets/projectstuff/EndOfAbyss/TEX_Gamepad_Buttons_Xbox.png">
  <figcaption> Xbox Texture Atlas </figcaption>
</figure>

One of the more important widgets I had to create trough slate is our controller/input hint widgets. This widget take a **UInputAction** and uses a **texture atlas** to display the corresponding button. It also needed to be able to update in runtime depending on which controller is being in use or if the player is playing on keyboard and mouse.


The first step in this process was to get the **FKey** currently associated with the UInputAction. Since we allow for rebinding keys in this game we have to extract the FKey from the **UEnhancedInputLocalPlayerSubsystem**.

<details markdown="1">
<summary> Code for getting the FKey </summary>

```cpp
FKey USCUIManager::GetFKeyFromActionName(FName ActionName)
{
	... // if valid checks for

		if (UEnhancedInputLocalPlayerSubsystem* enhancedSubsystem = 
    ULocalPlayer::GetSubsystem<UEnhancedInputLocalPlayerSubsystem>(pc->GetLocalPlayer()))
		{
			... // fetch variables and if valid checks
			for (const UInputMappingContext* mappingContext : AllInputMappingContexts)
			{
				for (const FEnhancedActionKeyMapping& mapping : mappingContext->GetMappings())
				{
					... //if mapping is valid and the correct mapping

					// Get player mapped keys
					if (const FKeyMappingRow* mappingRow = keyProfile->GetPlayerMappingRows().Find(mapping.GetMappingName()))
					{
						for (const FPlayerKeyMapping& Element : mappingRow->Mappings)
						{
							if (Element.GetCurrentKey().IsGamepadKey() ? CurrentInputDevice != EInputDevice::KeyboardMouse 
                              : CurrentInputDevice == EInputDevice::KeyboardMouse)
							{
								return Element.GetCurrentKey();
							}
						}
					}

                    // If mapping is valid but no player mapped keys
					if ( (mapping.Key.IsGamepadKey() ? CurrentInputDevice != EInputDevice::KeyboardMouse 
                     : CurrentInputDevice == EInputDevice::KeyboardMouse))
					{
						return mapping.Key;
					}

                  // Correct mapping but nothing relevant found, return nothing
                  return FKey();
				}
			}
		}
	return FKey();
}

```
</details>

<figure class="float-right twentyWidth">
    <a href="/assets/projectstuff/EndOfAbyss/AtlasMappings.png" target="_blank" rel="noopener noreferrer">
        <img class="bracket" preload="metadata" src="/assets/projectstuff/EndOfAbyss/AtlasMappings.png">
    </a>
  <figcaption> UI Manager TMap </figcaption>
</figure>

The next step is to get the current input devices atlas, this is done with a simle **TMap<EInputDevice, FInputAtlas> InputAtlases;**. The next step is to get the UV to display just one key. This is once again done with a TMap that looks for the key and gives back the placement of the icon. With some math this is then made in to the correct UV.

The interesting exception on the buttons are the default alphanumeric key prompts. For this we have an empty key symbol, it then gets a UTextBlock added to it to contain the relevant display string.

<details markdown="1">
<summary> Code for getting the empty key strings </summary>

```cpp
bool USCUIManager::GetGamepadButtonsUVByNameAndDevice(FName KeyName, EInputDevice InputDevice, FBox2D& UV, FString& OutArgs)
{
  ...
	if (!placement && InputDevice == EInputDevice::KeyboardMouse)
	{
		placement = atlas->DefaultGamepadButtonsUV.Find("DefaultPrompt");
		FString nameAsString = KeyName.ToString();

		if (nameAsString.Contains("NumPad"))
		{
			nameAsString = nameAsString.Replace(TEXT("NumPad"), TEXT(""));
		}

		if (FString* shortString = ShortHandMap.Find(nameAsString))
		{
			nameAsString = *shortString;
		}
		else if (FString* intString = StringToIntMap.Find(nameAsString))
		{
			nameAsString = *intString;
		}
		OutArgs = nameAsString;
	}
  ...
}

```
</details>

<details markdown="1">
<summary> USCInputDisplay Setup Code </summary>

```cpp
TSharedRef<SWidget> USCInputDisplay::RebuildWidget()
{
	FSlateBrush* inSlateBrush = &SlateBrush;
	FString keyArgs;
	FSlateFontInfo keyFont;
	if (InputAction.IsValid())
	{
		USCUIManager* uiManager = USCGlobals::GetSCUIManager(this);
#if WITH_EDITOR
		if (!uiManager)
		{
			uiManager = USCUIManager::GetDefaultManager();
		}
#endif
		if (uiManager)
		{
			// If in game bind to update image
			if(!IsDesignTime()) 
			{
				uiManager->OnUpdateInputDevice.AddUniqueDynamic(this, &USCInputDisplay::OnInputDeviceUpdated);
			}

			// Fetch the FKey from the UInputAction
			FKey key = uiManager->GetFKeyFromActionName(FName(InputAction.GetAssetName()));

			if (!key.GetFName().IsNone())
			{
				// Gets the uv associated with the key and if the key need any args 
				// for example if the key is the "A" keyboard button this will return an A.
				FBox2D uv;			
				if (uiManager->GetGamepadButtonsUVByKey(key, uv, keyArgs))
				{
					// Fetch the texture atlas associated with current input
					if (uiManager->GetGamepadButtonsTexture())
					{
						inSlateBrush->SetResourceObject(uiManager->GetGamepadButtonsTexture());
						inSlateBrush->SetImageSize(Size);
						inSlateBrush->SetUVRegion(uv);
					}
				}
			}

			keyFont = uiManager->KeyFont;
		}
	}

	// Build the actual widget
	MyInputDisplay = SNew(SSCInputDisplay)
		.Brush(inSlateBrush)
		.Height(Size.X)
		.Width(Size.Y)
		.Stretch(Stretch)
		.KeyArgs(keyArgs)
		.KeyFont(keyFont);

	return MyInputDisplay.ToSharedRef();
}
```
</details>

<video class="bracket" muted loop playsinline autoplay preload="metadata">
  <source src="/assets/projectstuff/EndOfAbyss/InputHints-web.mp4" type="video/mp4">
</video>

<br/>

## Controller hint for multiple UInputActions

An upside to creating the controller hints with slate is that I could reuse the code and slate from the single input display for other diffrent UWidgets. One of those is the USCMultipleInputDisplay widget. It does very similar things as the single version but instead takes an array of UInputActions, this is useful if one for example wants to show directional inputs.

<details markdown="1">
<summary> SSCMultipleInputDisplay Slate Construct code </summary>

```cpp

void SSCMultipleInputDisplay::Construct(const FArguments& InArgs)
{
	AttrStyleArgs = InArgs._StyleArgs;
	AttrHeight = InArgs._Height;
	AttrWidth = InArgs._Width;
	AttrStretch = InArgs._Stretch;
	AttrKeyFont = InArgs._KeyFont;

	
	ChildSlot[
		SAssignNew(HorizontalBox, SHorizontalBox)
	];

	HorizontalBox->ClearChildren();
	for(int32 i = 0; i < AttrStyleArgs.Num(); i++)
	{
		if(!AttrStyleArgs[i].Brush)
		{
			continue;
		}

		HorizontalBox->AddSlot()
			.HAlign(EHorizontalAlignment::HAlign_Center)
			.VAlign(EVerticalAlignment::VAlign_Center)
			.AutoWidth()

			[
				SNew(SSCInputDisplay)
					.Brush(AttrStyleArgs[i].Brush)
					.Height(AttrHeight)
					.Width(AttrWidth)
					.Stretch(AttrStretch)
					.KeyArgs(AttrStyleArgs[i].Args)
					.KeyFont(AttrKeyFont)
			];
		
		if(i != (AttrStyleArgs.Num() - 1))
		{
			HorizontalBox->AddSlot()
				.HAlign(EHorizontalAlignment::HAlign_Center)
				.VAlign(EVerticalAlignment::VAlign_Center)
				[
					SNew(STextBlock)
						.Text(INVTEXT("/"))
						.Font(AttrKeyFont)
				];
		}
	}
}

```
</details>

<br/>

## Controller hint text decorator

The last thing the SSCInputDisplay slate widget is used for is the in-text button prompts.

---

<br/>


# Custom UI navigation system
---

<br/>

# Tools
---

<br/>

# Platform certification and compliance
---

<br/>

# Suit Mods
---
<br/>



<script src="{{ '/assets/javascript/staticFX.js' | relative_url }}" defer></script>
